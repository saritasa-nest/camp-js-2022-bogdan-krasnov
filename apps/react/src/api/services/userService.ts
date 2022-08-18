import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';

import { httpClient } from '..';

const url = 'users/';

export namespace UserService {

  /** Get user profile. */
  export async function getUser(): Promise<User> {
    const { data } = await httpClient.get<UserDto>(`${url}profile/`);
    return UserMapper.fromDto(data);
  }

}
