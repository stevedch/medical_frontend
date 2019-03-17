import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Ticket} from '@/_models';

@Injectable({providedIn: 'root'})
export class TicketService {
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Ticket[]>(`${config.apiUrl}/ticket/`);
    }
}
