import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Ticket} from '@/_models';
import {HttpParamsOptions} from "@angular/common/http/src/params";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TicketService {
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Ticket[]>(`${config.apiUrl}/ticket/`);
    }

    getCreate(userId: number, title: string, description: string) {
        let headers = new HttpHeaders();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        const parameters: any = {user_id: userId, title: title, description: description};
        const httpParams: HttpParamsOptions = {fromObject: parameters} as HttpParamsOptions;
        const body = new HttpParams(httpParams);

        const options = {headers: headers};
        return this.http.post(`${config.apiUrl}/ticket/`, body, options).pipe(
            map((response: Response) => {
                    console.log(response)
                    const ticket = new Ticket();
                    ticket.description = response['description']
                    ticket.date_created = response['date_created']
                    return ticket;
                }
            ));
    }
}
