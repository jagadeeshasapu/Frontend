import { Component} from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: any[] = [];
  itemsInCart: number = 0;
  userCartData: any = [];
  constructor(private itemService: ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.getUserCartData();
  }
  getUserCartData(): void {
    this.itemService.getUserCart().subscribe(d => {
      this.userCartData = d.user?.cartItems;
      this.itemsInCart = d.user?.cartItems.length;
      console.log("this.userCartData--->",this.userCartData);
    });
  }
  fetchProducts(): void {
    this.itemService.fetchProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: any): void {
    this.itemService.addToCart(product);
    this.updateCartItemCount(product);
    
  }

  removeFromCart(product: any): void {
    this.itemService.removeFromCart(product);
    this.updateCartItemCount(product);
  }

  private updateCartItemCount(prod: any): void {
   let test = this.itemService.getCart();
   let check = this.userCartData.concat(test);
   let temp = this.itemService.convert(check);
    this.itemService.updateCart(temp).subscribe(products => {
      this.getUserCartData();
    });
  }
  addcart(){
    this.router.navigate(['/cart']);
  }
}
