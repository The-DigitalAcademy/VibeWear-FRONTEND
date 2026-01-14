import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn:'root'
})
export class ProductservService {
  private apiUrl = 'http://localhost:9090/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  
 // Fetch products in the same category
   getProductsByCategory(category: string): Observable<Product[]> {
     return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
   }

   storeProducts(products: Product[]): Observable<Product[]> {
    console.log('Storing products:', products);
     return this.http.post<Product[]>("http://localhost:9090/products", products);
   }

}
