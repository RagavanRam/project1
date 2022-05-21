import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../shared/user.model';
import { DatabaseService } from './../shared/database.service';
import { UsersService } from './../shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[] | any

  constructor(private userService: UsersService, private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dbService.fetchUser().subscribe()
    this.userService.updatedUsers.subscribe(
      res => {
        this.users = res
      }
    )
  }

  editUser(i:number) {
    this.router.navigate([`/manage-user/${i}`])
  }

  deleteUser(id: string) {
    let option = confirm('Are you sure you want to delete your user data?');
    if (option) {
      this.dbService.deleteUser(id).subscribe();
    }
  }

}
