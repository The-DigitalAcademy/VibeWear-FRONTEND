import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductservService } from '../../services/productserv.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToCart } from 'src/app/store/cart/cart.actions';
import { Product } from 'src/app/models/product.model';

declare var bootstrap: any;

@Component({
  selector: 'app-description-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.css']
})
export class DescriptionPageComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductservService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: product => (this.product = product),
        error: err => console.error(err)
      });
    }
  }

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }));

    const modalElement = document.getElementById('cartModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  goToCart() {
  const modalElement = document.getElementById('cartModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide(); 
    }
  }
  this.router.navigate(['/cart']);
}


  goToProducts() {
    this.router.navigate(['/products']);
  }
}

