import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Burger } from "./burger.interface";

@Injectable({
    providedIn: 'root'
})

export class BurgerService {
    private burgersUrl = 'assets/data/burgers.json';

    constructor(private http: HttpClient) { }

    getBurgers(): Observable<Burger[]> {
        return this.http.get<Burger[]>(this.burgersUrl);
    }
}