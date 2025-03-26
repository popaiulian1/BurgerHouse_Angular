import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  burgers = [
    {name: 'Cheeseburger', price: '$5.99'},
    {name: 'Hamburger', price: '$4.99'},
    {name: 'Bacon Cheeseburger', price: '$6.99'},
    {name: 'Veggie Burger', price: '$5.99'},
    {name: 'Double Cheeseburger', price: '$7.99'}
  ];

  contact = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Contact form submitted:', this.contact);
  }
}
