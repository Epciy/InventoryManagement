import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(private authService: AuthService,private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedRole = next.data['role'] as string;

    if (this.authService.hasAnyRole(allowedRole)) {
      console.log(allowedRole)
      return true;
     
    } else {
      console.log('error',allowedRole)
      // Redirect or handle unauthorized access
      this.router.navigate(['/login']);
      return false;
    }
  }
};



