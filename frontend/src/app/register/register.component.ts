import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private service: ServiceService) {
    this.signinForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex), Validators.minLength(5), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (!hasUppercase || !hasSpecialCharacter) {
      return { 'passwordRequirements': true };
    }

    return null;
  }

  async register() {
    const bodyData = {
      "firstname": this.signinForm.value.firstname,
      "lastname": this.signinForm.value.lastname,
      "email": this.signinForm.value.email,
      "password": this.signinForm.value.password,
    };

    try {
      const resultData: any = await this.service.registerUser(bodyData).toPromise();

      if (resultData.status === 'Success') {
        const verificationLink = resultData.verificationLink;

        // Redirect to OTP verification page with email as query parameter
        this.router.navigate(['/otp'], { queryParams: { email: bodyData.email } });
      } else {
        // Handle registration failure
      }
    } catch (error) {
      // Handle error
    }
  }



  save() {
    if (this.signinForm.valid) {
      this.register();
      this.signinForm.reset();
    }
  }
}



