import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Burger } from '../../core/burger/burger.interface';
import { BurgerService } from '../../core/burger/burger.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../core/cart/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  burgers: Burger[] = [];
  filteredBurgers: Burger[] = [];
  filters = {
    isVegetarian: false,
    isGlutenFree: false,
    isSpicy: false,
    isPopular: false,
    isNew: false
  };
  
  cart: Burger[] = [];
  notification: string | null = null;

  constructor(
    private burgerService: BurgerService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.burgerService.getBurgers().subscribe(
      (data) => {
        this.burgers = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching burgers:', error);
      }
    );
  }

  applyFilters(): void {
    // Start with all burgers
    this.filteredBurgers = this.burgers;

    // Apply each active filter
    if (this.filters.isVegetarian) {
      this.filteredBurgers = this.filteredBurgers.filter(burger => burger.isVegetarian);
    }
    
    if (this.filters.isGlutenFree) {
      this.filteredBurgers = this.filteredBurgers.filter(burger => burger.isGlutenFree);
    }
    
    if (this.filters.isSpicy) {
      this.filteredBurgers = this.filteredBurgers.filter(burger => burger.isSpicy);
    }
    
    if (this.filters.isPopular) {
      this.filteredBurgers = this.filteredBurgers.filter(burger => burger.isPopular);
    }
    
    if (this.filters.isNew) {
      this.filteredBurgers = this.filteredBurgers.filter(burger => burger.isNew);
    }
  }

  addToCart(burger: Burger): void {
    this.cartService.addToCart(burger);

    this.notification = `${burger.name} added to cart!`;
  
  // Clear notification after 3 seconds
  setTimeout(() => {
    this.notification = null;
  }, 3000);

  }
}