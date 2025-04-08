import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { Burger } from "./burger.interface";

@Injectable({
    providedIn: 'root'
})

export class BurgerService {
    private burgersUrl = 'assets/data/burgers.json';

    constructor(private http: HttpClient) { }

    getBurgers(): Observable<Burger[]> {
        return this.http.get<Burger[]>(this.burgersUrl)
            .pipe(
                catchError(error => {
                    console.error('Error fetching burgers:', error);
                    return ([]); // Return an empty array on error
                })
            )
    }

    getBurger(id: string): Observable<Burger | undefined> {
        return this.http.get<Burger[]>(this.burgersUrl)
            .pipe(catchError(error => {
                console.error('Error fetching burger:', error);
                return ([]); // Return an empty array on error
            }),
            map(burgers => burgers.find(burger => burger.id === id))
        );
    }
}