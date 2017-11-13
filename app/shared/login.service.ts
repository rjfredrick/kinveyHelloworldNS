import { Kinvey } from 'kinvey-nativescript-sdk';
import { User } from './user.model';

export class LoginService {
  public static login(user: User) {
    return Kinvey.User.login(user.username, user.password);
  }
}