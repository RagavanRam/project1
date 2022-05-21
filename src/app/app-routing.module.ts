import { UserResolveResolver } from './shared/user-resolve.resolver';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path: 'manage-user', loadChildren: () => import('./manage-user/manage-user.module').then(m => m.ManageUserModule)},
  {path: 'manage-user/:id', loadChildren: () => import('./manage-user/manage-user.module').then(m => m.ManageUserModule), resolve: [UserResolveResolver]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
