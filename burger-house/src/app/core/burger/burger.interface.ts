export interface Burger{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    ingredients: string[];
    isVegetarian: boolean;
    isGlutenFree: boolean;
    isSpicy: boolean;
    isPopular: boolean;
    isNew: boolean;
    createdAt: Date;
    updatedAt: Date;
}