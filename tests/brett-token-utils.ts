import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/BrettToken/BrettToken"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createExcludeFromFeesEvent(
  account: Address,
  isExcluded: boolean
): ExcludeFromFees {
  let excludeFromFeesEvent = changetype<ExcludeFromFees>(newMockEvent())

  excludeFromFeesEvent.parameters = new Array()

  excludeFromFeesEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  excludeFromFeesEvent.parameters.push(
    new ethereum.EventParam(
      "isExcluded",
      ethereum.Value.fromBoolean(isExcluded)
    )
  )

  return excludeFromFeesEvent
}

export function createExcludeFromLimitsEvent(
  account: Address,
  isExcluded: boolean
): ExcludeFromLimits {
  let excludeFromLimitsEvent = changetype<ExcludeFromLimits>(newMockEvent())

  excludeFromLimitsEvent.parameters = new Array()

  excludeFromLimitsEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  excludeFromLimitsEvent.parameters.push(
    new ethereum.EventParam(
      "isExcluded",
      ethereum.Value.fromBoolean(isExcluded)
    )
  )

  return excludeFromLimitsEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSetAutomatedMarketMakerPairEvent(
  pair: Address,
  value: boolean
): SetAutomatedMarketMakerPair {
  let setAutomatedMarketMakerPairEvent =
    changetype<SetAutomatedMarketMakerPair>(newMockEvent())

  setAutomatedMarketMakerPairEvent.parameters = new Array()

  setAutomatedMarketMakerPairEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )
  setAutomatedMarketMakerPairEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromBoolean(value))
  )

  return setAutomatedMarketMakerPairEvent
}

export function createSwapAndLiquifyEvent(
  tokensSwapped: BigInt,
  ethReceived: BigInt,
  tokensIntoLiquidity: BigInt
): SwapAndLiquify {
  let swapAndLiquifyEvent = changetype<SwapAndLiquify>(newMockEvent())

  swapAndLiquifyEvent.parameters = new Array()

  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "tokensSwapped",
      ethereum.Value.fromUnsignedBigInt(tokensSwapped)
    )
  )
  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "ethReceived",
      ethereum.Value.fromUnsignedBigInt(ethReceived)
    )
  )
  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "tokensIntoLiquidity",
      ethereum.Value.fromUnsignedBigInt(tokensIntoLiquidity)
    )
  )

  return swapAndLiquifyEvent
}

export function createTokensAirdroppedEvent(
  totalWallets: BigInt,
  totalTokens: BigInt
): TokensAirdropped {
  let tokensAirdroppedEvent = changetype<TokensAirdropped>(newMockEvent())

  tokensAirdroppedEvent.parameters = new Array()

  tokensAirdroppedEvent.parameters.push(
    new ethereum.EventParam(
      "totalWallets",
      ethereum.Value.fromUnsignedBigInt(totalWallets)
    )
  )
  tokensAirdroppedEvent.parameters.push(
    new ethereum.EventParam(
      "totalTokens",
      ethereum.Value.fromUnsignedBigInt(totalTokens)
    )
  )

  return tokensAirdroppedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createdevelopmentWalletUpdatedEvent(
  newWallet: Address,
  oldWallet: Address
): developmentWalletUpdated {
  let developmentWalletUpdatedEvent = changetype<developmentWalletUpdated>(
    newMockEvent()
  )

  developmentWalletUpdatedEvent.parameters = new Array()

  developmentWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("newWallet", ethereum.Value.fromAddress(newWallet))
  )
  developmentWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldWallet", ethereum.Value.fromAddress(oldWallet))
  )

  return developmentWalletUpdatedEvent
}

export function createliquidityWalletUpdatedEvent(
  newWallet: Address,
  oldWallet: Address
): liquidityWalletUpdated {
  let liquidityWalletUpdatedEvent = changetype<liquidityWalletUpdated>(
    newMockEvent()
  )

  liquidityWalletUpdatedEvent.parameters = new Array()

  liquidityWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("newWallet", ethereum.Value.fromAddress(newWallet))
  )
  liquidityWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldWallet", ethereum.Value.fromAddress(oldWallet))
  )

  return liquidityWalletUpdatedEvent
}

export function createmarketingWalletUpdatedEvent(
  newWallet: Address,
  oldWallet: Address
): marketingWalletUpdated {
  let marketingWalletUpdatedEvent = changetype<marketingWalletUpdated>(
    newMockEvent()
  )

  marketingWalletUpdatedEvent.parameters = new Array()

  marketingWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("newWallet", ethereum.Value.fromAddress(newWallet))
  )
  marketingWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldWallet", ethereum.Value.fromAddress(oldWallet))
  )

  return marketingWalletUpdatedEvent
}
