import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { INewAd } from "src/app/model/ad/ad.model";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AdService {

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

    public getAllAd(): Observable<INewAd[]> {
        return this.httpClient.get<INewAd[]>(`${environment.url}/ad/all`, { headers: this.headers });
    }


    public postAd(params: INewAd): Observable<INewAd> {
        console.log(this.headers)
        return this.httpClient.post<INewAd>(`${environment.url}/ad/create/${this.id}`, params, { headers: this.headers });
    }

    public scheduleAd(params: any): Observable<any>{
        return this.httpClient.put<any>(`${environment.url}/ad/send-ad-schedule/${this.id}`, params, { headers: this.headers })
    }
}