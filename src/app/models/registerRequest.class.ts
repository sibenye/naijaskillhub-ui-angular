export class RegisterRequest {
  constructor(
    public accountType: string,
    public credentialType: string,
    public firstName: string,
    public lastName: string,
    public emailAddress: string,
    public password: string
  ) {  }
}