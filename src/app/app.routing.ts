import {Routes, RouterModule} from '@angular/router';

import {TicketComponent} from './ticket';
import {LoginComponent} from './login';
import {AuthGuard} from './_guards';

const appRoutes: Routes = [
    {
        path: '',
        component: TicketComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
