import { Component, OnInit } from '@angular/core';
import { ProductservService } from './services/productserv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})


export class AppComponent implements OnInit {
  title = 'Ecommerce-App';
   // The following code demonstrates how to use the ProductservService to fetch products *testing purpose
  products: any[] = [];

  constructor(private productServic: ProductservService) { } 
  ngOnInit(): void {
    // Fetch products when the component initializes
    this.productServic.getProducts().subscribe((data: any[]) => {
      this.products = data;
      // this.productServic.storeProducts(this.products).subscribe({
      //     next: storedProducts => {
      //       console.log('Products stored successfully:', storedProducts);
      //     },
      //     error: err => {
      //       console.error('Error storing products:', err);
      //     }
      //   });
    });
    // console.log("Products in component:", this.products);
        
  }
}
