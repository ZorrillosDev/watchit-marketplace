export interface UsersArgs {
  limit?: number
}

export interface UsersActions {
  fetchCreators: <P extends UsersArgs>(args?: P) => void
}
