import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {

    constructor(
        private httpClient: HttpClient
    ) { }

    public resetPassword(params: any): Observable<any> {
        let token = localStorage.getItem('resetToken')
        token = token!.replace(/['"]+/g, '');
        console.log(token)
        return this.httpClient.post<any>(`${environment.url}/auth/reset_password/${token}`, params)
    }

}