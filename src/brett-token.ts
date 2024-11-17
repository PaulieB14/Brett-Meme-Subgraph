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
  marketingWalletUpdated as marketingWalletUpdatedEvent
} from "../generated/BrettToken/BrettToken"
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
  marketingWalletUpdated
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExcludeFromFees(event: ExcludeFromFeesEvent): void {
  let entity = new ExcludeFromFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.isExcluded = event.params.isExcluded

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExcludeFromLimits(event: ExcludeFromLimitsEvent): void {
  let entity = new ExcludeFromLimits(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.isExcluded = event.params.isExcluded

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetAutomatedMarketMakerPair(
  event: SetAutomatedMarketMakerPairEvent
): void {
  let entity = new SetAutomatedMarketMakerPair(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pair = event.params.pair
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwapAndLiquify(event: SwapAndLiquifyEvent): void {
  let entity = new SwapAndLiquify(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokensSwapped = event.params.tokensSwapped
  entity.ethReceived = event.params.ethReceived
  entity.tokensIntoLiquidity = event.params.tokensIntoLiquidity

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensAirdropped(event: TokensAirdroppedEvent): void {
  let entity = new TokensAirdropped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.totalWallets = event.params.totalWallets
  entity.totalTokens = event.params.totalTokens

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handledevelopmentWalletUpdated(
  event: developmentWalletUpdatedEvent
): void {
  let entity = new developmentWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newWallet = event.params.newWallet
  entity.oldWallet = event.params.oldWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleliquidityWalletUpdated(
  event: liquidityWalletUpdatedEvent
): void {
  let entity = new liquidityWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newWallet = event.params.newWallet
  entity.oldWallet = event.params.oldWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlemarketingWalletUpdated(
  event: marketingWalletUpdatedEvent
): void {
  let entity = new marketingWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newWallet = event.params.newWallet
  entity.oldWallet = event.params.oldWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
