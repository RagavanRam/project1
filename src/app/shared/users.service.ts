import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  editUser = new Subject<User>();
  updatedUsers = new Subject<User[]>();
  users: User[] | any;

  constructor() { }

  setUsers(users: User[]) {
    this.users = users;
    this.updatedUsers.next(this.users);
  }

  getusers() {
    return this.users;
  }

  getUser(index:number) {
    return this.users[index];
  }
}
