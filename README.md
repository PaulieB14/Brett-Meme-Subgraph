This project deploys a subgraph for the **Based Brett** meme coin on the Base blockchain. The goal is to track token-related activities such as transfers, approvals, fee exclusions, and other events. This subgraph enables analytics, community transparency, and token interaction insights.

### **Website and Token Contract**

- **Official Website**: https://www.basedbrett.com/#tokenomics
- **Token Contract**: [0x532f27101965dd16442e59d40670faf5ebb142e4](https://basescan.org/token/0x532f27101965dd16442e59d40670faf5ebb142e4)

# Example Queries for Subgraph

```graphql
# Ownership History
{
  ownershipTransferreds(orderBy: blockTimestamp, orderDirection: asc) {
    id
    previousOwner
    newOwner
    blockTimestamp
    transactionHash
  }
  # Transfers
  transfers(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
    id
    from
    to
    value
    blockNumber
    blockTimestamp
    transactionHash
  }
  # Marketmaker
  setAutomatedMarketMakerPairs(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
    id
    pair
    value
    blockTimestamp
    transactionHash
  }
  # Ownership Transfers
  ownershipTransferreds(first: 5, orderBy: blockTimestamp, orderDirection: desc) {
    id
    previousOwner
    newOwner
    blockTimestamp
    transactionHash
  }
  # Top Token Holders
  holders(first: 10, orderBy: balance, orderDirection: desc) {
    id
    balance
    totalReceived
    totalSent
    transactionCount
  }
  # Transfers Between Two Addresses
  transfers(
    where: { from: "0xAddress1", to: "0xAddress2" }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    value
    blockTimestamp
    transactionHash
  }
  # Fetch Token Metrics with Dynamic
  transfers(where: { value_gt: "1000000000000000000" }, orderBy: value, orderDirection: desc) {
    id
    from
    to
    value
    blockTimestamp
  }
}

