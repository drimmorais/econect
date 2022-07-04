import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpdateUser, User } from 'src/app/model/auth/user.model';
import { IUpdateCitizen } from 'src/app/model/citizen/citizen.model';
import { IUpdateCollectPoint } from 'src/app/model/collectPoint/collectPoint.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class UpdateService {

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

    public getUserCitizen(): Observable<User> {
        return this.httpClient.get<any>(`${environment.url}/citizen/perfil/${this.id}`, { headers: this.headers });
    }

    public getUserCollectPoint(): Observable<User> {
        return this.httpClient.get<any>(`${environment.url}/collectpoint/perfil/${this.id}`, { headers: this.headers });
    }

    public updateCitizen(params: IUpdateCitizen): Observable<IUpdateCitizen> {
        return this.httpClient.put<IUpdateCitizen>(`${environment.url}/citizen/update/${this.id}`, params, { headers: this.headers });
    }

    public updateCollectPoint(params: IUpdateCollectPoint): Observable<IUpdateCollectPoint> {
        console.log('Opa bati aqui', params)
        return this.httpClient.post<IUpdateCollectPoint>(`${environment.url}/collectpoint/insertToValide/${this.id}`, params, { headers: this.headers });
    }

    public updateUser(params: IUpdateUser): Observable<IUpdateUser> {
        return this.httpClient.put<IUpdateUser>(`${environment.url}/user/update/${this.id}`, params, { headers: this.headers });
    }

}

