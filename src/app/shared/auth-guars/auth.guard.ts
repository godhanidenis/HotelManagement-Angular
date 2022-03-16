import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

  
  export class AuthGuard implements CanActivate {
    constructor(private routes : Router){}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(localStorage.getItem('username')!= null){
          return true;
            }
            else
            {
              this.routes.navigate(['/login']);
              return false;
            }
      
    }
  }



