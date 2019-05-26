import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(public ordersService:OrdersService) { }

  coffees = ["Americano", "Flat White", "Cappuccino", "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];
//empty array to house the coffee order
  coffeeOrder = [];
  //add new coffees to order
  addCoffee = coffee => this.coffeeOrder.push(coffee);
  //remove coffee from the order
  removeCoffee = coffee => {
    let index = this.coffeeOrder.indexOf(coffee);
    if (index > -1) this.coffeeOrder.splice(index, 1)
  };

  onSubmit() {
    this.ordersService.form.value.coffeeOrder = this.coffeeOrder;
    let data = this.ordersService.form.value;

    this.ordersService.createCoffeeOrder(data)
        .then(res => {
            //there will be something like a success message or reset the form
            this.ordersService.form.reset();
        });
  }

  ngOnInit() {
  }

}
