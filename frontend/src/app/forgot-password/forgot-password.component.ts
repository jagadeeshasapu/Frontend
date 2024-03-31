import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  otp: string = ''; 
  errorMessage: string = '';
  otpSent: boolean = false;  // Flag to track if OTP has been sent
  loading: boolean = false;

  constructor(private authService: ServiceService, private router:Router) { }
  
  sendOTP(): void {
    this.loading = true; // Show spinner while OTP is being sent
    // Call your backend service to send OTP
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        console.log(response);
        // OTP sent successfully, set otpSent flag to true
        this.otpSent = true;
        this.errorMessage = ''; // Clear any previous error message
      },
      error => {
        console.error('Send OTP error:', error);
        this.errorMessage = error.error.message || 'An error occurred while sending OTP.';
      }
    ).add(() => {
      this.loading = false; // Hide spinner after OTP is sent
    }); 
  }

  submitNewPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Verify OTP before updating password
    this.authService.verifyOTP(this.email, this.otp).subscribe(
      response => {
        console.log(response);
        // Call a function to update the password in the backend
        this.updatePassword();
      },
      error => {
        console.error('Verify OTP error:', error);
        this.errorMessage = error.error.message || 'An error occurred while verifying OTP.';
      }
    );
  }

  updatePassword(): void {
    this.authService.updatePassword(this.email, this.newPassword).subscribe(
      response => {
        console.log(response);
        // Handle success, redirect user to login page or show a success message
        this.router.navigate([''])
      },
      error => {
        console.error('Update password error:', error);
        this.errorMessage = error.error.message || 'An error occurred while updating your password.';
      }
    );
  }
}
