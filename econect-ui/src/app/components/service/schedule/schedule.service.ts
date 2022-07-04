import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class ScheduleService {

    public token: string = this.authService.getToken()
    public id = this.authService.getId();
    // public params = new HttpParams();
    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
    })

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public getMaterialByCategory(params: any): Observable<any> {
        console.log(params)
        return this.httpClient.get<any>(`${environment.url}/scheduleCollect/materialByCategory/${params}`, {headers: this.headers,});
    }

    public getCollectPointAll(params1: any): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/scheduleCollect/collectPointByMaterialCategory/${params1}`, {headers: this.headers});
    }

    public postSchedule(params: any): Observable<any> {
        console.log(params)
        return this.httpClient.post<any>(`${environment.url}/scheduleCollect/createSchedule/${this.id}`, params , {headers: this.headers});
    }



}