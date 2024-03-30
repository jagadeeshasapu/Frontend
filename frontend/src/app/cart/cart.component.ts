import { Component, OnInit} from '@angular/core';
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
  shipping: any = 20;
  constructor(private itemService: ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.itemService.getUserCart().subscribe(data => {
      this.items = data.user.cartItems;
      this.total();
      // let check = this.items
      console.log("itemService--->>",this.items);
    })
  }

  plusClick(i: any) {
    this.items[i].count = this.items[i].count+=1;
    this.total();
  }
  minusClick(i: any) {
    this.items[i].count = (this.items[i].count >= 0) ?(this.items[i].count-=1):0;
    this.total();
  }
  total(){
    console.log(this.items.map((a: any) => (a.count * a.price)));
    this.totalAmount =  this.items.map((a: any) => (a.count * a.price)).reduce((a: any,b: any) => (a+b))
  }
    
}
