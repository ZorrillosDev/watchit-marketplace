export interface Web3Payable {
  value?: string
}

export interface Web3SafePurchaseArgs extends Web3Payable {
  tokenId: string
}

export interface Web3SetApprovalForArgs extends Web3SafePurchaseArgs {
  operator: string
  approved: string
}

export interface Web3Actions {
  setApprovalFor: <P extends Web3SetApprovalForArgs>(args: P) => void
  safePurchase: <P extends Web3SafePurchaseArgs>(args: P) => void
}
