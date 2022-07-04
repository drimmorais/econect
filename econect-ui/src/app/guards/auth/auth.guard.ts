// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { AuthService } from 'src/app/components/service/auth/auth.service';
// import { User } from 'src/app/model/auth/user.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanLoad, CanActivate {

//   constructor(
//     private authService: AuthService
//   ) { }

//   checkAuthentication(path: string): Observable<boolean> {
//     return this.authService.isLoggedIn()
//       .pipe(
//         map((user: User) => {
//           if (!user) {
//             this.authService.handleLogin(`/${path}`);
//             return false;
//           }
//           return true;
//         })
//       )
//   }

//   canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
//     return this.checkAuthentication(route.path);
//   }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.checkAuthentication(state.url);
//   }

// }
