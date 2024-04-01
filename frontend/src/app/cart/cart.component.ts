import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: any = [];
  totalAmount: any = 0;
  shipping: number = 20;
  finaltotal: any = 0;
  constructor(private itemService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getUserCartData();
  }

  getUserCartData(): void {
    this.itemService.getUserCart().subscribe(data => {
      this.items = data.user.cartItems;
      this.total();
      this.finalamount();
      // let check = this.items
      console.log("itemService--->>", this.items);
    })
  }

  plusClick(i: any) {
    this.items[i].count = this.items[i].count += 1;
    this.total();
    this.finalamount();
    this.updateItems();
  }
  minusClick(i: any) {
    this.items[i].count = (this.items[i].count >= 0) ? (this.items[i].count -= 1) : 0;
    this.total();
    this.finalamount();
    this.updateItems();
  }
  total() {
    console.log(this.items.map((a: any) => (a.count * a.price)));
    this.totalAmount = this.items.map((a: any) => (a.count * a.price)).reduce((a: any, b: any) => (a + b))
    this.finalamount();
  }
  finalamount() {
    this.finaltotal = this.totalAmount + this.shipping;
  }
  removeItem(index: number) {
    if (index > -1 && index < this.items.length) {
      this.items.splice(index, 1);
      this.updateItems();
    }
  }
  updateItems(){
    this.itemService.updateCart(this.items).subscribe(products => {
      this.getUserCartData();
      this.total();
      this.finalamount();
    });
  }
  sucess(){
    this.router.navigate(['successfully']);
  }
  
}
