import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, public authService: AuthService) {}

  login() {
    const user = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(user).subscribe(
      (response: any) => {
        console.log('Login response:', response);

        if (response.token) {
          localStorage.setItem("user",JSON.stringify(response.user_data))
          // Save the token and user details in a secure way, such as local storage or a cookie
          // this.authService.saveToken(response.token);
          // this.authService.saveUser(response.user);
          // alert('Login successful');
          this.router.navigate(['dashboard']);
        } else {
          alert('User is not verified. Please check your email for verification.');
        }
      },
      (error: any) => {
        // Handle login error
        alert('Login failed. Please check your credentials.');
      }
    );
  }

  goToProfile() {
    this.router.navigate(['']);
  }

  register() {
    this.router.navigate(['/register'])
  }

  activeForm: string = 'login';
}
