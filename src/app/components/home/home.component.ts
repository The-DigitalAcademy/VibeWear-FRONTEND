import { Component, OnInit } from '@angular/core';
import { ProductservService } from '../../services/productserv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  currentSlide = 0;

  constructor(private productService: ProductservService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.slice(0, 5);
      this.startSlideshow();
    });
  }

  startSlideshow() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.products.length;
    }, 3000);
  }
}
