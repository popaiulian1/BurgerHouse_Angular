import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Burger } from '../../core/burger/burger.interface';
import { BurgerService } from '../../core/burger/burger.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredBurgers: Burger[] = [];

  constructor(private burgerService: BurgerService) {}

  ngOnInit(): void {
    this.burgerService.getBurgers().subscribe((burgers) => {
      this.featuredBurgers = burgers.filter((burger) => burger.isNew);
    });
  }

  private router =  inject(Router);

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

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
