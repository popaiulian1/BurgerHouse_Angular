import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { CartItem } from "./cart.interface";
import { Burger } from "../burger/burger.interface";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);

    constructor() { 
        const savedCart = localStorage.getItem('burgerCart');
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
            this.cartSubject.next(this.cartItems);
        }
    }

    getCart(): Observable<CartItem[]> {
        return this.cartSubject.asObservable();
    }

    getCartItemCount(): Observable<number> {
        return this.cartSubject.asObservable().pipe(
            map(items => items.reduce((total, item) => total + item.quantity, 0))
        );
    }

    getTotalPrice(): Observable<number> {
        return this.cartSubject.asObservable().pipe(
            map(items => items.reduce((total, item) => total + (item.burger.price * item.quantity), 0))
        );
    }

    addToCart(burger: Burger): void{
        const existingItem = this.cartItems.find(item => item.burger.id === burger.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cartItems.push({ burger, quantity: 1 });
        }

        this.updateCart();
    }

    removeFromCart(burgerId: string): void{
        this.cartItems = this.cartItems.filter(item => item.burger.id !== burgerId);
        this.updateCart();
    }

    updateCart(): void{
        this.cartSubject.next([...this.cartItems]);
        localStorage.setItem('burgerCart', JSON.stringify(this.cartItems));
    }

    updateQuantity(burgerId: string, quantity: number): void{
        const existingItem = this.cartItems.find(item => item.burger.id === burgerId);
        if (existingItem) {
            if (quantity <= 0) {
                this.removeFromCart(burgerId);
            } else {
                existingItem.quantity = quantity;
                this.updateCart();
            }
        }
    }

    clearCart(): void{
        this.cartItems = [];
        this.updateCart();
    }
}