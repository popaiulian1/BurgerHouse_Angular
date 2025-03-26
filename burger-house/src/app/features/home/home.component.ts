import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private router =  inject(Router);

  featuredBurgers = [
    {name: 'Cheeseburger', price: '$5.99'},
    {name: 'Bacon Cheeseburger', price: '$6.99'},
    {name: 'Double Cheeseburger', price: '$7.99'}
  ];

  contact = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };

  navigateToLearnMore() {
    this.router.navigateByUrl('/about');
  }

  onSubmit() {
    console.log('Contact form submitted:', this.contact);
  }
}
