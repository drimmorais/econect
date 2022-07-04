import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class CollectPointService {

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

    public getAllCollectPoints(): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/collectpoint/all`, { headers: this.headers });
    }

}