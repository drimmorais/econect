import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { INewAd } from "src/app/model/ad/ad.model";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class ApproveCollectPointService {

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

    public getAllApperoves(): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/admin/allPending`, { headers: this.headers });
    }

    public getUpdatesPending(): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/admin/updatesPending`, { headers: this.headers });
    }

    public getInfosOfPending(param: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/admin/infosOfPending/${param}`, { headers: this.headers });
    }

    public getInfosOfUpdatesPending(param: string): Observable<any> {
        console.log(param)
        console.log(this.headers )
        return this.httpClient.get<any>(`${environment.url}/admin/infosOfUpdatesPending/${param}`, { headers: this.headers });
    }

    public putApproveCollectPoint(param: string): Observable<any> {
        console.log(this.headers )
        return this.httpClient.put<any>(`${environment.url}/admin/approveCollectPoint/${param}`, { headers: this.headers });
    }

    public putApproveUpdates(param: string): Observable<any> {
        console.log(param)
        return this.httpClient.put<any>(`${environment.url}/admin/approveUpdates/${param}`, { headers: this.headers });
    }

    public putDisapprovedUpdates(param: string): Observable<any> {
        console.log(param)
        return this.httpClient.put<any>(`${environment.url}/admin/disapprovedUpdates/${param}`, { headers: this.headers });
    }

    public putDisapprovedNewCollectPoint(param: string): Observable<any> {
        console.log(param)
        return this.httpClient.put<any>(`${environment.url}/admin/disapproveCollectPoint/${param}`, { headers: this.headers });
    }

}