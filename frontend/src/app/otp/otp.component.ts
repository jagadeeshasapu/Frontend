import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  email: string = '';
  otpForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private service: ServiceService, ) {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }
  verifyOTP(): void {
    const otp = this.otpForm.value.otp;

    this.service.verifyOTP(this.email, otp).subscribe(
      (response: any) => {
        console.log('OTP Verified Successfully');
       alert('OTP Verified Successfully')
        this.router.navigate([''])
      },
      (error: any) => {
        console.error('Error verifying OTP:', error);
        // Handle error - display message or retry option
      }
    );
  }
}