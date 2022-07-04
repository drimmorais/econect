import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Login } from 'src/app/model/auth/login.model';
import { Token } from 'src/app/model/auth/token';
import { User } from 'src/app/model/auth/user.model';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private lastUrl: string;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) {

    }


    public isLoggedIn(): any {
        // era um observable
        // const token = localStorage.getItem('econectToken');
        // return token ?  
        // ? this.refreshToken(token) : of(null)
        return
    }

    // private refreshToken(token: string): Observable<User> {
    // return this.httpClient.post<User>(`${environment.url}/auth/login`, token)
    //   .pipe(
    //     map(([user, permissions]: [User, Array<Permission>]) => {
    //       this.user = this.mergeUserWithPermissions(user, permissions);
    //       if (!this.user.permissions.bannedTags && !this.user.userRole.includes('ROLE_NO_ACCESS')) {
    //         return user;
    //       }
    //       localStorage.removeItem('token');
    //       throw new HttpErrorResponse({
    //         status: 403,
    //         statusText: 'Forbidden'
    //       });
    //     }),
    //     catchError((err: HttpErrorResponse, caught: Observable<User>) => {
    //       if (err.status === 401) {
    //         localStorage.removeItem('token');
    //       }
    //       console.error(err)
    //       return of(null);
    //     })
    //   );
    //   }

    public getToken(): any {
        return localStorage.getItem('econectToken');
    }

    public getUserInfos(): any {
        let userInfos: any = localStorage.getItem('userInfo');
        userInfos = JSON.parse(userInfos)
        return userInfos
    }

    public getId(): any {
        let id: any = localStorage.getItem('userInfo');
        id = JSON.parse(id)
        return id.id
    }

    public handleLogin(path: string = environment.url) {
        this.router.navigate(['/login', btoa(path)]);
    }

    public postLogin(params: Login): Observable<any> {
        return this.httpClient.post<any>(`${environment.url}/auth/login`, params);
    }

}

