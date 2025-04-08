import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/cart/cart.service';
import { Burger } from '../../core/burger/burger.interface';
import { Subscription } from 'rxjs';

interface CartItem {
  burger: Burger;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  
  private cartSubscription: Subscription | null = null;
  private priceSubscription: Subscription | null = null;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
    
    this.priceSubscription = this.cartService.getTotalPrice().subscribe(price => {
      this.totalPrice = price;
    });
  }
  
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }
  }
  
  increaseQuantity(burgerId: string): void {
    const item = this.cartItems.find(item => item.burger.id === burgerId);
    if (item) {
      this.cartService.updateQuantity(burgerId, item.quantity + 1);
    }
  }
  
  decreaseQuantity(burgerId: string): void {
    const item = this.cartItems.find(item => item.burger.id === burgerId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(burgerId, item.quantity - 1);
    }
  }
  
  removeItem(burgerId: string): void {
    this.cartService.removeFromCart(burgerId);
  }
  
  clearCart(): void {
    this.cartService.clearCart();
  }
  
  checkout(): void {
    alert('Alright bro, you checked out!');
    console.log('Checking out with items:', this.cartItems);
  }
}