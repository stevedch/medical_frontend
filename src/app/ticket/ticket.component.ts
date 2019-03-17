import {Component} from '@angular/core';
import {first} from 'rxjs/operators';

import {Ticket, User} from '@/_models';
import {TicketService} from '@/_services';
import {BehaviorSubject, Observable} from "rxjs";

@Component({templateUrl: 'ticket.component.html'})
export class TicketComponent {
    public currentUser: User;

    tickets: Ticket[] = [];

    constructor(private ticketService: TicketService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.ticketService.getAll().pipe(first()).subscribe(tickets => {
            this.tickets = tickets;
        });
    }
}
