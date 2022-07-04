import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {

    constructor(
        private httpClient: HttpClient
    ) { }

    public forgotPassword(params: any): Observable<any> {
        return this.httpClient.post<any>(`${environment.url}/auth/forgot_password`, params)
    }

}