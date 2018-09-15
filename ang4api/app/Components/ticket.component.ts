import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IkeyValuePair } from '../Model/keyValuePair';
import { ITicket } from '../Model/ticketModel';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { DropdownComponent } from './dropdown.component';

@Component({
    templateUrl: 'app/Components/ticket.component.html'
})

export class TicketComponent implements OnInit {
    indLoading: boolean = false;
    applications: IkeyValuePair[];
    users: IkeyValuePair[];
    modules: IkeyValuePair[];
    statuses: IkeyValuePair[];
    priorities: IkeyValuePair[];
    types: IkeyValuePair[];
    tickets: any[];
    msg: string;
    ticketId: number = 0;
    sub: any;
    ticket: ITicket;
    title: string;

    constructor(private _adminservice: AdminService, private _route: ActivatedRoute, private _router: Router, private location: Location) { }

    ngOnInit(): void {

        this.Loadapplications();
        this.Loadusers();
        this.Loadmodules();
        this.Loadstatuses();
        this.Loadpriorities();
        this.Loadtypes();

        this.sub = this._route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.ticketId = params.ticketId || 0;
                if (this.ticketId > 0) {
                    this.GetTicketById(this.ticketId);

                }
                else {
                    this.LoadTickets();
                }
            });

        if (this.ticketId == 0) {
            this.LoadTickets();
        }
    }

    //ngOnDestroy() {
    //    this.sub.unsubscribe();
    //}


    goBack() {
        this.ticketId = 0;
        this.ticket = null;
        this.location.back();
        console.log('goBack()...');
    }

    LoadTickets(): void {
        this.indLoading = true;
        this.title = "Ticket Summary";
        this._adminservice.get(Global.BASE_TICKET_ENDPOINT)
            .subscribe(tickets => { this.tickets = tickets; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    Loadapplications(): void {

        this._adminservice.get(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_APPMASTER)
            .subscribe(applications => { this.applications = applications; },
            error => this.msg = <any>error);
    }

    Loadusers(): void {

        this._adminservice.get(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_USERMASTER)
            .subscribe(users => { this.users = users; },
            error => this.msg = <any>error);
    }

    Loadmodules(): void {

        this._adminservice.get(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_MODULEMASTER)
            .subscribe(modules => { this.modules = modules; },
            error => this.msg = <any>error);
    }

    Loadstatuses(): void {

        this._adminservice.get(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_STATUSMASTER)
            .subscribe(statuses => { this.statuses = statuses; },
            error => this.msg = <any>error);
    }

    Loadpriorities(): void {

        this._adminservice.get(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_PRIORITYMASTER)
            .subscribe(priorities => { this.priorities = priorities; },
            error => this.msg = <any>error);
    }

    Loadtypes(): void {

        this._adminservice.get(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_TYPEMASTER)
            .subscribe(types => { this.types = types; },
            error => this.msg = <any>error);
    }

    GetTicketById(id: number): void {

        this._adminservice.getById(Global.BASE_TICKET_ENDPOINT, id)
            .subscribe(ticket => { this.ticket = ticket[0]; this.title = this.ticket.Title; },
            error => this.msg = <any>error);
    }


    saveticket(id: number): void {
        this._adminservice.put(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_UPDATE, this.ticket.TicketId, this.ticket).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.goBack();
                }
                else {
                    this.msg = "There is some issue in saving records, please contact to system administrator!"
                }
            },
            error => {
                this.msg = error;
            }
        );
    }
}
