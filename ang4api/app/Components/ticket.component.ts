import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IkeyValuePair } from '../Model/keyValuePair';
import { Ticket } from '../Model/ticketModel';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { AlertComponent } from './alert.component';
import { AlertService } from '../Service/alert.service';
import { concat } from 'rxjs/operator/concat';

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
    ticket: Ticket;
    title: string;
    ticketForm: FormGroup;
    constructor(private _adminservice: AdminService, private _route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder, private router: Router, private alertService: AlertService, private datepipe: DatePipe) { }

    ngOnInit(): void {
        this.ticketId = 0;
        this.Loadapplications();
        this.Loadusers();
        this.Loadmodules();
        this.Loadstatuses();
        this.Loadpriorities();
        this.Loadtypes();
        this.ticketForm = this.formBuilder.group({});
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

        this.ticket = new Ticket();
        this.ticket.TicketId = -1;
        this.ticketForm = this.formBuilder.group({
            'TicketId': new FormControl(this.ticket.TicketId),
            'Title': new FormControl(this.ticket.Title, [Validators.required]),
            'TDescription': new FormControl(this.ticket.TDescription, [Validators.required]),
            'CreatedBy': new FormControl(this.ticket.CreatedBy, [Validators.required, Validators.min(1)]),
            'StatusId': new FormControl(this.ticket.StatusId, [Validators.required, Validators.min(1)]),
            'Createddate': new FormControl(this.ticket.Createddate, [Validators.required]),
            'AssignedTo': new FormControl(this.ticket.AssignedTo, [Validators.required, Validators.min(1)]),
            'PriorityId': new FormControl(this.ticket.PriorityId, [Validators.required, Validators.min(1)]),
            'TypeId': new FormControl(this.ticket.TypeId, [Validators.required, Validators.min(1)]),
            'ApplicationId': new FormControl(this.ticket.ApplicationId, [Validators.required, Validators.min(1)]),
            'ModuleID': new FormControl(this.ticket.ModuleID, [Validators.required, Validators.min(1)]),
            'ResponseDeadline': new FormControl(this.ticket.ResponseDeadline, [Validators.required]),
            'ResolutionDeadline': new FormControl(this.ticket.ResolutionDeadline, [Validators.required]),
            'RootCauseId': new FormControl(this.ticket.RootCauseId, [Validators.required, Validators.min(1)]),
            'Coommnets': new FormControl(this.ticket.Coommnets, [Validators.required]),
            'UpdatedBy': new FormControl(this.ticket.UpdatedBy),
            'LastModifiedon': new FormControl(this.ticket.LastModifiedon)
        });

        this.ticketForm.controls['Createddate'].valueChanges.subscribe(value => {
            console.log(value);

            this.ticketForm.controls['Createddate'].setValue(this.datepipe.transform(value, 'dd/MM/yyyy'),
                {
                    onlySelf: false,
                    emitEvent: false,
                    emitModelToViewChange: false,
                    emitViewToModelChange: false
                }  );

        });
    }

    //ngOnDestroy() {
    //    this.sub.unsubscribe();
    //}


    goBack() {
        if (this.ticketForm.dirty) {
            this.alertService.confirmThis("Your changes will be lost, you want to continue?", function () {
                this.backtosummary();
            }, function () {
                return;
            })
        }
        else {
            this.backtosummary();
        }
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
            .subscribe(ticket => {
                this.ticket = ticket[0];
                this.title = this.ticket.Title;
                this.ticketForm.setValue(Object.assign({}, this.ticket));
            },
                error => this.msg = <any>error);

        this.ticketForm.controls['TicketId'].disable();
    }


    backtosummary(): void {
        this.ticketId = 0;
        this.ticket = new Ticket();
        this.router.navigate(['/Ticket']);
    }
    saveticket(): void {
        console.log(this.ticketForm);
        console.log(this.ticketForm.status);
        if (this.ticketForm.status == 'INVALID') {
            return;
        }
        const tktresult: Ticket = Object.assign({}, this.ticketForm.getRawValue());
        this._adminservice.put(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_UPDATE, tktresult.TicketId, tktresult).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.backtosummary();
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

    fileEvent($event: { target: { files: { [x: string]: File; }; }; }) {
        const fileSelected: File = $event.target.files[0];
        this._adminservice.uploadFile(Global.BASE_TICKET_ENDPOINT + Global.BASE_TICKET_UPLOAD, fileSelected).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.msg = "File Upload successfull"
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
