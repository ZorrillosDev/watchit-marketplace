export interface Web3SetApprovalForArgs {
  operator: string
  tokenId: string
  approved: string
}

export interface Web3Actions {
  setApprovalFor: <P extends Web3SetApprovalForArgs>(args: P) => void
}
