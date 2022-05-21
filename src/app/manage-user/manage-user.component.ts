import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from './../shared/users.service';
import { DatabaseService } from './../shared/database.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  userIndex: number | any;
  editmode: boolean = false;
  userForm: FormGroup | any;

  constructor(private usersService: UsersService, private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
          this.userIndex = +params['id']
          this.editmode = params['id'] != null;
          this.initForm();
        }
    )
  }

  onSubmit() {
    if(!this.userForm.valid) {
      return;
    }
    if(this.editmode) {
      let userid = this.usersService.getUser(this.userIndex).id;
      this.dbService.updateUser(userid, this.userForm.value).subscribe(res => {
        alert('User data edited successfully');
      }, err => {
        alert('an error occurred in editing user data')
      });
    }
    else {
      this.dbService.addUser(this.userForm.value).subscribe(res => {
        alert('User data added successfully')
      }, err => {
        alert('an error occurred in adding user data')
      });
    }
    this.userForm.reset();
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  private initForm() {
    let userName: string = '';
    let userPassword: string = '';
    let userMail: string = '';

    if (this.editmode) {
      const user = this.usersService.getUser(this.userIndex);
      userName = user.name;
      userPassword = user.password;
      userMail = user.email;
    }

    this.userForm = new FormGroup({
      'name': new FormControl(userName, Validators.required),
      'password': new FormControl(userPassword, [Validators.required, Validators.minLength(6)]),
      'email': new FormControl(userMail, [Validators.required, Validators.email])
    })
  }

}
