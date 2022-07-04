import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INewCitizen } from 'src/app/model/citizen/citizen.model';
import { User } from 'src/app/model/auth/user.model';
import { INewCollectPoint } from 'src/app/model/collectPoint/collectPoint.model';


@Injectable({ providedIn: 'root' })
export class RegisterService {

    constructor(
        private httpClient: HttpClient
    ) { }

    public postRegisterUser(form: User): Observable<User> {
        return this.httpClient.post<any>(`${environment.url}/user/create`, form);
    }

    public postRegisterCitizen(form: INewCitizen): Observable<INewCitizen> {
        return this.httpClient.post<any>(`${environment.url}/citizen/create`, form);
    }

    public postRegisterCollectPoint(form: INewCollectPoint): Observable<INewCollectPoint> {
        return this.httpClient.post<INewCollectPoint>(`${environment.url}/collectpoint/create`, form);
    }

}

