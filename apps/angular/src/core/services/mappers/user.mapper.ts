import { Injectable } from '@angular/core';

import { User } from '../../models/user';

import { UserDto } from './dto/user.dto';

/** User mapper. */
@Injectable({
  providedIn: 'root',
})
export class UserMapper {
  /** @inheritdoc */
  public fromDto(data: UserDto): User {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
    };
  }
}
