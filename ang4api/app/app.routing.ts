import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin.component';
import { HomeComponent } from './components/home.component';
import { TicketComponent } from './components/ticket.component';
import { LoginComponent } from './components/login.component';
import { PageNotFoundComponent } from './components/PageNotFound.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'Ticket', component: TicketComponent, canActivate: [AuthGuard] },
     { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);