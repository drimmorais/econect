import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class CalendarService {

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

    public getCalendarCitizen(date: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/calendar/citizen-calendar/${this.id}/${date}`, {headers: this.headers,});
    }

    public getCalendarCollectPoint(date: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.url}/calendar/collect-point-calendar/${this.id}/${date}`, {headers: this.headers,});
    }

    public inProgress(operation_id: any): Observable<any> {
        let params = {
            operation_id: operation_id
        }
        return this.httpClient.put<any>(`${environment.url}/pending-collect/in-progress/${this.id}`, params, {headers: this.headers,});
    }

    public refuseScheduling(operation_id: any): Observable<any> {
        let params = {
            operation_id: operation_id
        }
        return this.httpClient.put<any>(`${environment.url}/pending-collect/unrealized/${this.id}`, params, {headers: this.headers,});
    }

    public cancelScheduling(operation_id: any): Observable<any> {
        let params = {
            operation_id: operation_id
        }
        return this.httpClient.put<any>(`${environment.url}/pending-collect/cancel/${this.id}`, params, {headers: this.headers,});
    }

    public concludedScheduling(operation_id: any): Observable<any> {
        let params = {
            operation_id: operation_id
        }
        return this.httpClient.put<any>(`${environment.url}/pending-collect/confirm/${this.id}`, params, {headers: this.headers,});
    }

    public deliveredScheduling(operation_id: any): Observable<any> {
        let params = {
            operation_id: operation_id
        }
        return this.httpClient.put<any>(`${environment.url}/pending-collect/user-confirm/${this.id}`, params, {headers: this.headers,});
    }
    
    public chat(): Observable<any>{
        return this.httpClient.get<any>(`${environment.url_chat}`)
    }

}