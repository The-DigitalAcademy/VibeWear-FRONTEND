import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  register(arg0: { name: any; surname: any; email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
