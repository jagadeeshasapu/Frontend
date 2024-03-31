import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'otp',
    component: OtpComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'updateProfile',
    component:ProfileComponent
  },
  {
    path:'forgot',
    component:ForgotPasswordComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
