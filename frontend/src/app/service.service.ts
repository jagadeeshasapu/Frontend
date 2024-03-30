  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
  import { catchError,  throwError } from 'rxjs';
  import { AuthService } from './auth.service';
  import { BehaviorSubject, Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class ServiceService {
    private products: any[] = [];
    private cart: any[] = [];
    private itemsInCart: number = 0;
    private totalPrice: number = 0;


    verifyEmail(email: string | null | undefined, verificationToken: any): any {
      throw new Error('Method not implemented.');
    }
    private baseUrl = 'http://localhost:5000';

    constructor(private http:HttpClient, private authService: AuthService) { }
    registerUser(user:any):Observable<any[]> {
      return this.http.post<any[]>(`${this.baseUrl}/register` ,user);
    }
    login(credentials: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/login`, credentials);
    }
    


    verifyToken(otp: string): Observable<any> {
      const body = { otp }; // Update the body to include OTP
      return this.http.post<any>(`${this.baseUrl}/verifyToken`, body);
    }

    verifyOTP(email: string, otp: string) {
      return this.http.post<any>(`${this.baseUrl}/verify-otp`, { email, otp });
    }
    convert(arr: any) {
      let i: any = {};
      arr.forEach((u: any) => {
        i[u.name] = []
      })
      for (let name in i) {
        i[name] = (arr.map((r: any) => {
          r.count = r.count ? r.count : 1
          return r;
        }).filter((k: any) => k.name == name)).reduce((a: any, b: any) => {
          return { ...a, count: (a?.count + b?.count) }
        })
      }
      return Object.keys(i).map((p: any) => i[p])
    };
    
    sendVerificationEmail(email: string, otp: string): Observable<any> {
      const body = { email, otp }; // Update the body to include OTP instead of verificationLink
      return this.http.post<any>(`${this.baseUrl}/send-verification-email`, body);
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
      return throwError('Something bad happened; please try again later.');
    }
   

    fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product`);
  }
    updateCart(productData: any): Observable<any[]> {
      let user_data: any = localStorage.getItem("user");
      let data = JSON.parse(user_data);

    return this.http.put<any[]>(`${this.baseUrl}/product/${data._id}`,productData );
  }

    addToCart(product: any): void {
      this.totalPrice += product.price;
      this.cart.push(product);
      this.itemsInCart++;
    }

    removeFromCart(product: any): void {
      const index = this.cart.findIndex(prdt => prdt._id === product._id);
      if (index !== -1) {
        this.totalPrice -= this.cart[index].price;
        this.cart.splice(index, 1);
        this.itemsInCart--;
      } else {
        console.log("Item not found in the cart");
      }
    }

    getProducts(): any[] {
      return this.products;
    }

    getCart(): any[] {
      return this.cart;
    }
    getUserCart(): Observable<any> {
      let user_data: any = localStorage.getItem("user");
      let data = JSON.parse(user_data);
      return this.http.get<any>(`${this.baseUrl}/user/${data._id}`);
    }

    getItemsInCart(): number {
      return this.itemsInCart;
    }

    getTotalPrice(): number {
      return this.totalPrice;
    }

    updateUserProfile(userId: string, formData: FormData) {
      return this.http.post<any>(`${this.baseUrl}/updateProfile/${userId}`, formData);
    }
  
  
  }
