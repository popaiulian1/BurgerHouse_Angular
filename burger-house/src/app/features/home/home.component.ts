import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Burger } from '../../core/burger/burger.interface';
import { BurgerService } from '../../core/burger/burger.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  private viewportScroller = inject(ViewportScroller);

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

  navigateToShop() {
    this.router.navigateByUrl('/shop');
  }

  scrollToContact(event: Event): void{
    event.preventDefault();

    this.viewportScroller.scrollToAnchor('contact-section');
    // Using setTimeout to ensure the DOM is fully rendered before scrolling
    setTimeout(() => {
      const element = document.getElementById('contact-section');
      if (element) {
        const headerOffset = 70; // Adjust if you have a fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}
