import {Component} from '@angular/core';
import {first} from 'rxjs/operators';

import {Ticket, User} from '@/_models';
import {TicketService} from '@/_services';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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


@Component({templateUrl: 'ticket.create.component.html'})
export class TicketCreateComponent {
    public currentUser: User;

    createForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';


    constructor(
        private ticketService: TicketService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.returnUrl = '/';
    }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });


    }

    // convenience getter for easy access to form fields
    get f() {
        return this.createForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;
        this.ticketService.getCreate(this.currentUser.id, this.f.title.value, this.f.description.value).pipe(first()).subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.error = error;
            this.loading = false;
        });
    }
}
