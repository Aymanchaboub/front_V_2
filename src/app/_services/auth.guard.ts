import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const userRole =   this.storageService.getUser().roles;

    if (userRole == 'ROLE_ADMIN') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
 
}
