export interface UserState {
  loginAttempt?: string;
  rsaPublicKey?: string;

  isLoggedOn: boolean;
  isAdministrator: boolean;

  errorMessage?: string;
  isLoading: boolean;

  loginToken?: string;
  refreshToken?: string;
}

export const INITIAL_USER_STATE: UserState = {
  isLoading: false,
  isLoggedOn: false,
  isAdministrator: false,
};
