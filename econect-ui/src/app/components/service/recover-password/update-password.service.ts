import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class UpdatePasswordService {

    public token: string = this.authService.getToken()
    public id = this.authService.getId();
    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
    })

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public updatePasswordCollectPoint(params: any): Observable<any> {
        console.log(params)
        return this.httpClient.put<any>(`${environment.url}/collectpoint/updatePassword/${this.id}`, params, { headers: this.headers })
    }

    public updatePasswordCitizen(params: any): Observable<any> {
        console.log(params)
        return this.httpClient.put<any>(`${environment.url}/citizen/updatePassword/${this.id}`, params, { headers: this.headers })
    }

}