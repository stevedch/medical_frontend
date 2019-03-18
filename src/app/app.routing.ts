import {RouterModule, Routes} from '@angular/router';

import {TicketComponent, TicketCreateComponent} from './ticket';
import {LoginComponent} from './login';
import {AuthGuard, AuthTicketGuard} from './_guards';

const appRoutes: Routes = [
    {
        path: '',
        component: TicketComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'ticket/create',
        component: TicketCreateComponent,
        canActivate: [AuthGuard, AuthTicketGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
