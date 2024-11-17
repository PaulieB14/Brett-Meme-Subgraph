import {
  Approval as ApprovalEvent,
  ExcludeFromFees as ExcludeFromFeesEvent,
  ExcludeFromLimits as ExcludeFromLimitsEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SetAutomatedMarketMakerPair as SetAutomatedMarketMakerPairEvent,
  SetBuyFees as SetBuyFeesEvent,
  SwapAndLiquify as SwapAndLiquifyEvent,
  TokensAirdropped as TokensAirdroppedEvent,
  Transfer as TransferEvent,
  developmentWalletUpdated as developmentWalletUpdatedEvent,
  liquidityWalletUpdated as liquidityWalletUpdatedEvent,
  marketingWalletUpdated as marketingWalletUpdatedEvent,
} from "../generated/BrettToken/BrettToken";

import {
  Approval,
  ExcludeFromFees,
  ExcludeFromLimits,
  OwnershipTransferred,
  SetAutomatedMarketMakerPair,
  SwapAndLiquify,
  TokensAirdropped,
  Transfer,
  developmentWalletUpdated,
  liquidityWalletUpdated,
  marketingWalletUpdated,
  TokenAnalytics,
  Holder,
  GlobalSettings,
} from "../generated/schema";

import { BigInt, Bytes } from "@graphprotocol/graph-ts";

/** Helper Functions **/

function getTokenAnalytics(): TokenAnalytics {
  let analytics = TokenAnalytics.load("analytics");
  if (!analytics) {
    analytics = new TokenAnalytics("analytics");
    analytics.totalTransfers = BigInt.zero();
    analytics.totalAirdropped = BigInt.zero();
    analytics.uniqueHolders = 0;
    analytics.totalSupply = BigInt.zero();
    analytics.totalLiquidityAdded = BigInt.zero();
    analytics.totalBurned = BigInt.zero();
    analytics.blockTimestamp = BigInt.zero();
    analytics.save();
  }
  return analytics;
}

function getHolder(address: Bytes): Holder {
  let holder = Holder.load(address);
  if (!holder) {
    holder = new Holder(address);
    holder.balance = BigInt.zero();
    holder.totalReceived = BigInt.zero();
    holder.totalSent = BigInt.zero();
    holder.transactionCount = 0;
    holder.save();
  }
  return holder;
}

function getGlobalSettings(): GlobalSettings {
  let settings = GlobalSettings.load("settings");
  if (!settings) {
    settings = new GlobalSettings("settings");
    settings.buyFees = BigInt.zero();
    settings.sellFees = BigInt.zero();
    settings.maxTransaction = BigInt.zero();
    settings.maxWallet = BigInt.zero();
    settings.tradingActive = true;
    settings.swapEnabled = true;
    settings.blockTimestamp = BigInt.zero();
    settings.save();
  }
  return settings;
}

/** Event Handlers **/

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let analytics = getTokenAnalytics();
  analytics.totalTransfers = analytics.totalTransfers.plus(BigInt.fromI32(1));
  analytics.blockTimestamp = event.block.timestamp;
  analytics.save();

  let sender = getHolder(event.params.from);
  sender.balance = sender.balance.minus(event.params.value);
  sender.totalSent = sender.totalSent.plus(event.params.value);
  sender.transactionCount += 1;
  sender.save();

  let receiver = getHolder(event.params.to);
  receiver.balance = receiver.balance.plus(event.params.value);
  receiver.totalReceived = receiver.totalReceived.plus(event.params.value);
  receiver.transactionCount += 1;
  receiver.save();

  if (!Holder.load(event.params.to)) {
    analytics.uniqueHolders += 1;
    analytics.save();
  }
}

export function handleSetBuyFees(event: SetBuyFeesEvent): void {
  let settings = getGlobalSettings();
  settings.buyFees = event.params.buyFees;
  settings.blockTimestamp = event.block.timestamp;
  settings.save();
}

export function handleExcludeFromFees(event: ExcludeFromFeesEvent): void {
  let entity = new ExcludeFromFees(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.account = event.params.account;
  entity.isExcluded = event.params.isExcluded;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleExcludeFromLimits(event: ExcludeFromLimitsEvent): void {
  let entity = new ExcludeFromLimits(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.account = event.params.account;
  entity.isExcluded = event.params.isExcluded;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let settings = getGlobalSettings();
  settings.tradingActive = true;
  settings.blockTimestamp = event.block.timestamp;
  settings.save();
}

export function handleSetAutomatedMarketMakerPair(event: SetAutomatedMarketMakerPairEvent): void {
  let entity = new SetAutomatedMarketMakerPair(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.pair = event.params.pair;
  entity.value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleSwapAndLiquify(event: SwapAndLiquifyEvent): void {
  let entity = new SwapAndLiquify(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.tokensSwapped = event.params.tokensSwapped;
  entity.ethReceived = event.params.ethReceived;
  entity.tokensIntoLiquidity = event.params.tokensIntoLiquidity;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let analytics = getTokenAnalytics();
  analytics.totalLiquidityAdded = analytics.totalLiquidityAdded.plus(event.params.tokensIntoLiquidity);
  analytics.blockTimestamp = event.block.timestamp;
  analytics.save();
}

export function handleTokensAirdropped(event: TokensAirdroppedEvent): void {
  let entity = new TokensAirdropped(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.totalWallets = event.params.totalWallets;
  entity.totalTokens = event.params.totalTokens;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let analytics = getTokenAnalytics();
  analytics.totalAirdropped = analytics.totalAirdropped.plus(event.params.totalTokens);
  analytics.blockTimestamp = event.block.timestamp;
  analytics.save();
}

export function handledevelopmentWalletUpdated(event: developmentWalletUpdatedEvent): void {
  let entity = new developmentWalletUpdated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.newWallet = event.params.newWallet;
  entity.oldWallet = event.params.oldWallet;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleliquidityWalletUpdated(event: liquidityWalletUpdatedEvent): void {
  let entity = new liquidityWalletUpdated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.newWallet = event.params.newWallet;
  entity.oldWallet = event.params.oldWallet;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handlemarketingWalletUpdated(event: marketingWalletUpdatedEvent): void {
  let entity = new marketingWalletUpdated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.newWallet = event.params.newWallet;
  entity.oldWallet = event.params.oldWallet;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

// New handlers for analytics and settings
export function handleTransferForAnalytics(event: TransferEvent): void {
  let analytics = getTokenAnalytics();
  analytics.totalTransfers = analytics.totalTransfers.plus(BigInt.fromI32(1));
  analytics.blockTimestamp = event.block.timestamp;
  analytics.save();
}

export function handleTokensAirdroppedForAnalytics(event: TokensAirdroppedEvent): void {
  let analytics = getTokenAnalytics();
  analytics.totalAirdropped = analytics.totalAirdropped.plus(event.params.totalTokens);
  analytics.blockTimestamp = event.block.timestamp;
  analytics.save();
}

export function handleOwnershipTransferredForSettings(event: OwnershipTransferredEvent): void {
  let settings = getGlobalSettings();
  settings.tradingActive = true; // Example update
  settings.blockTimestamp = event.block.timestamp;
  settings.save();
}