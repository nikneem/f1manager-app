export class LoginAttemptDto {
  id?: string;
  rsaPublicKey?: string;

  constructor(init?: Partial<LoginAttemptDto>) {
    Object.assign(this, init);
  }
}

export class LoginRequestDto {
  id?: string;
  username?: string;
  password?: string;

  constructor(init?: Partial<LoginRequestDto>) {
    Object.assign(this, init);
  }
}

export class LoginResponseDto {
  id?: string;
  username?: string;
  password?: string;

  constructor(init?: Partial<LoginResponseDto>) {
    Object.assign(this, init);
  }
}

export class LoginResultDto {
  errorMessage?: string;
  jwtToken?: string;
  refreshToken?: string;
  success: boolean = false;

  constructor(init?: Partial<LoginResultDto>) {
    Object.assign(this, init);
  }
}

export class UserRegistrationDto {
  emailAddress?: string;
  username?: string;
  password?: string;

  constructor(init?: Partial<UserRegistrationDto>) {
    Object.assign(this, init);
  }
}

export class PasswordResetDto {
  usernameOrEmail?: string;
  baseUrl?: string;

  constructor(init?: Partial<PasswordResetDto>) {
    Object.assign(this, init);
  }
}
export class PasswordResetVerificationDto {
  usernameOrEmail?: string;
  VerificationCode?: string;

  constructor(init?: Partial<PasswordResetVerificationDto>) {
    Object.assign(this, init);
  }
}
export class ChangePasswordDto {
  oldPassword?: string;
  newPassword?: string;

  constructor(init?: Partial<ChangePasswordDto>) {
    Object.assign(this, init);
  }
}

export class RefreshTokenDto {
  token?: string;

  constructor(init?: Partial<RefreshTokenDto>) {
    Object.assign(this, init);
  }
}
