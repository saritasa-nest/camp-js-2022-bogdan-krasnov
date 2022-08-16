import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

  /** User email. */
  public readonly email: string;

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  public constructor(data: InitArgsUser) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}

type InitArgsUser = OmitImmerable<User>;
