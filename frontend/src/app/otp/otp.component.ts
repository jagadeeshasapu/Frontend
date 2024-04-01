import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit{
  email: string = '';
  otpForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ServiceService
  ) {
    this.otpForm = this.fb.group({
      first: ['', Validators.required],
      second: ['', Validators.required],
      third: ['', Validators.required],
      fourth: ['', Validators.required],
      fifth: ['', Validators.required],
      sixth: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verifyOTP(): void {
    const otp = Object.values(this.otpForm.value).join('');

    this.service.verifyOTP(this.email, otp).subscribe(
      (response: any) => {
        console.log('OTP Verified Successfully');
        alert('OTP Verified Successfully');
        this.router.navigate(['']);
      },
      (error: any) => {
        console.error('Error verifying OTP:', error);
        // Handle error - display message or retry option
      }
    );
  }
}
