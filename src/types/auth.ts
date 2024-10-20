export interface ISignInInfo {
  email: string;
  password: string;
}

export interface ISignUpInfo extends ISignInInfo {
  name: string;
}
