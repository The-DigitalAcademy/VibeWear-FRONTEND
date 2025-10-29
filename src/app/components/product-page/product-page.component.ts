import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductservService } from '../../services/productserv.service';
import { CartService } from '../../services/cart.service';

import { Router } from '@angular/router';
@Component({
  selector: 'product-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  standalone: true,
})

// injected the API from services
export class ProductPageComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductservService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    // Optional: Show toast notification
    alert(`${product.title} added to cart!`);
  }

  onSelectProduct(productId: Number): void {
    console.log('Navigating to product ID:', productId);
    this.router.navigate(['products', productId]);
  }
}
