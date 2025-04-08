import { Burger } from '../burger/burger.interface';

export interface CartItem {
    burger: Burger;
    quantity: number;
}