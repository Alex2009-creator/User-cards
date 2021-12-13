import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { UsersComponent } from './dashboard/users/users.component';
import { RealizationService } from './shared/services/realization.service';
import { ViewUserComponent } from './dashboard/view-user/view-user.component';
import { AddUsersComponent } from './dashboard/add-users/add-users.component';
import { EditUserComponent } from './dashboard/edit-user/edit-user.component';



const routes: Routes = [
  
  {
    path:"",  
    redirectTo:"dashboard",
    pathMatch:"full"
  },
  {
    path:"login",
    component: SignUpComponent
  },
  {
    path:"dashboard",
    loadChildren:() => import("./dashboard/dashboard.module").then(m=>m.DashboardModule),
    canActivate: [RealizationService]
  },
  {
    path:"users",
    component: UsersComponent,
    canActivate: [RealizationService]
  },
  {
    path: "viewuser",
    component: ViewUserComponent,
    canActivate: [RealizationService]
  },  
  {
    path: "adduser",
    component: AddUsersComponent,
    canActivate: [RealizationService]
  }, 
  {
    path: "edituser",
    component: EditUserComponent,
    canActivate: [RealizationService]
  } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
