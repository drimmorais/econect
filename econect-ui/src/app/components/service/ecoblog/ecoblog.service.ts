import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class EcoblogService {

    public token: string = this.authService.getToken()
    public id = this.authService.getId();
    public headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${this.token}`
    })

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public create(params: any): Observable<any> {
        console.log(params)
        return this.httpClient.post<any>(`${environment.url}/admin/createPostToEcoblog`, params, {headers: this.headers});
    }

    public getPosts(): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/admin/getAllEcoBlog`, {headers: this.headers});
    }
}