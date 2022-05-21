import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserComponent } from './manage-user.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ManageUserComponent},
    ]),
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ManageUserModule { }
