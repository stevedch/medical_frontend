import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '@/_models';
import {HttpParamsOptions} from "@angular/common/http/src/params";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        let headers = new HttpHeaders();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        const parameters: any = {username: username, password: password};
        const httpParams: HttpParamsOptions = {fromObject: parameters} as HttpParamsOptions;
        const body = new HttpParams(httpParams);

        const options = {headers: headers};

        return this.http.post<any>(`${config.apiUrl}/auth/login/`, body, options).pipe(
            map((response: Response) => {
                    const user: User = response['data'];
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }
                    return user;
                }
            ));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
