import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductservService } from '../../services/productserv.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  searchTerm = '';
  searchResults: any[] = [];
  showResults = false;

  constructor(
    private productService: ProductservService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.productService.getProducts().subscribe(products => {
        this.searchResults = products.filter(product =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showResults = true;
      });
    }
  }

  hideResults() {
    setTimeout(() => this.showResults = false, 200);
  }

  goToProduct(productId: number) {
    this.router.navigate(['/products', productId]);
    this.showResults = false;
  }
}