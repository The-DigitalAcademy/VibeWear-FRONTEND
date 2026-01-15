import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { RouterModule,Router } from '@angular/router';
import { clearCart } from 'src/app/store/cart/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-check-out-pop-up',
  templateUrl: './check-out-pop-up.component.html',
  imports: [RouterModule],
  styleUrls: ['./check-out-pop-up.component.css'],
  standalone: true,
})
export class CheckOutPopUpComponent {
  OrderCode = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit order code  

  constructor(private store: Store ,private router: Router) { } 
 

 //This will close the pop-up when the user clicks the close button
  ClosePopUp() {

    this.router.navigate(['/products']);
    this.clearCart();
    
  } 
  clearCart(): void {
      this.store.dispatch(clearCart());
    }
}
