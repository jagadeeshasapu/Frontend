import { Component } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileData: any;
  selectedFile: File | null = null;
  imgUrl: string | undefined;
  showCardDetailsForm: boolean = false;
  cardNumber: string | undefined;
  cardHolderName: string | undefined;
  expirationDate: string | undefined;
  cvv: string | undefined;


  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const data: any = localStorage.getItem('user');
    this.profileData = JSON.parse(data);
    this.imgUrl = `http://localhost:5000/uploads/${this.profileData?.profileImage}`;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserProfile(): void {
    const userId = this.profileData._id;

    const formData = new FormData();
    formData.append('firstname', this.profileData.firstname);
    formData.append('lastname', this.profileData.lastname);
    formData.append('email', this.profileData.email);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    formData.append('cardNumber', this.cardNumber || '');
  formData.append('cardHolderName', this.cardHolderName || '');
  formData.append('expirationDate', this.expirationDate || '');
  formData.append('cvv', this.cvv || '');

    this.service.updateUserProfile(userId, formData).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);

        
        this.loadUserProfile();
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
  toggleCardDetailsForm(): void {
    this.showCardDetailsForm = !this.showCardDetailsForm;
  }
  
}
