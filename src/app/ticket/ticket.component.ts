import {Component} from '@angular/core';
import {first} from 'rxjs/operators';

import {Ticket} from '@/_models';
import {TicketService} from '@/_services';

@Component({templateUrl: 'ticket.component.html'})
export class TicketComponent {
    tickets: Ticket[] = [];

    constructor(private ticketService: TicketService) {
    }

    ngOnInit() {
        this.ticketService.getAll().pipe(first()).subscribe(tickets => {
            this.tickets = tickets;
        });
    }
}
