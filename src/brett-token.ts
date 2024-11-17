import {
  Approval as ApprovalEvent,
  ExcludeFromFees as ExcludeFromFeesEvent,
  ExcludeFromLimits as ExcludeFromLimitsEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SetAutomatedMarketMakerPair as SetAutomatedMarketMakerPairEvent,
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

import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";

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
  let holder = Holder.load(address.toHex());
  if (!holder) {
    holder = new Holder(address.toHex());
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

  if (!Holder.load(event.params.to.toHex())) {
    analytics.uniqueHolders += 1;
    analytics.save();
  }
}

/** Call Handlers **/

export function handleBuyFees(call: ethereum.Call): void {
  let settings = getGlobalSettings();
  let buyFeesResult = call.outputs[0].toBigInt();
  settings.buyFees = buyFeesResult;
  settings.save();
}

export function handleSellFees(call: ethereum.Call): void {
  let settings = getGlobalSettings();
  let sellFeesResult = call.outputs[0].toBigInt();
  settings.sellFees = sellFeesResult;
  settings.save();
}
