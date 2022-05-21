import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

import { User } from './user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient, private userService: UsersService) { }

  fetchUser() {
    return this.http.get<User[]>('https://project1-19359-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
    .pipe(map(res => {
      const userArray = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          userArray.push({...res[key], id: key});
        }
      }
      return userArray
    }), tap(
      res => {
        this.userService.setUsers(res)
      }
    ))
  }

  addUser(user: User) {
    return this.http.post('https://project1-19359-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', user).pipe(tap(res => {
      this.fetchUser().subscribe();
    }));
  }

  updateUser(id: string, user: {name: string, password: string, email: string}) {
    return this.http.put('https://project1-19359-default-rtdb.asia-southeast1.firebasedatabase.app/users/'+id+'.json', user).pipe(tap(res => {
      this.fetchUser().subscribe();
    }));
  }

  deleteUser(id: string) {
    return this.http.delete('https://project1-19359-default-rtdb.asia-southeast1.firebasedatabase.app/users/'+id+'.json').pipe(tap(res => {
      this.fetchUser().subscribe();
    }))
  }
}
