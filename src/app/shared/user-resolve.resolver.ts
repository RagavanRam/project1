import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { User } from './user.model';
import { UsersService } from './users.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolveResolver implements Resolve<User[]> {

  constructor(private dbService: DatabaseService, private userService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const users = this.userService.getusers();
    if(!users) {
      return this.dbService.fetchUser()
    }else {
      return users;
    }
  }
}
