import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  burgers = [
    {name: 'Cheeseburger', price: '$5.99'},
    {name: 'Bacon Cheeseburger', price: '$6.99'},
    {name: 'Double Cheeseburger', price: '$7.99'},
    {name: 'Veggie Burger', price: '$5.99'},
    {name: 'Chicken Burger', price: '$6.99'},
    {name: 'Fish Burger', price: '$4.99'},
    {name: 'Turkey Burger', price: '$5.99'},
    {name: 'Buffalo Burger', price: '$6.99'}
  ];
}
