import { Component, OnInit } from '@angular/core';
import { IkeyValuePair } from '../Model/keyValuePair';
import { UserService } from '../Service/user.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../Service/message.service';
import { Router } from "@angular/router";
@Component({
    selector: 'menu-items',
    template: `<div *ngIf='routeCollection'>
    <nav class='navbar navbar-inverse' >
        <div class='container-fluid' >
            <ul class='nav navbar-nav' >
               <li  *ngFor="let cols of routeCollection"> <a [routerLink]="[cols.key]" > {{ cols.keyValue }} </a></li >
            </ul>
        <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="#" (click)="logout()"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
        </ul>
        </div>
      </nav>
        </div>` 
})


export class MenuComponent implements OnInit {
    msg: any;
    currentUser: string;
    routeCollection: IkeyValuePair[];
    subscription: Subscription;
    constructor(public messageService: MessageService, private userService: UserService, private router: Router) {
       // this.routeCollection = [];
    }

    ngOnInit(): void {
        if (this.routeCollection == null) {
            this.LoadMenus();
        }
        this.subscription = this.messageService.message.subscribe(
            (message) => {
                this.routeCollection = message;
                console.log(message);
            }
        );
    }

    LoadMenus(): void {
        this.userService.getusermenu()
            .subscribe(routeCollection => {
                this.messageService.setMessage(routeCollection);
            },
                error => this.msg = <any>error);
    }

    logout(): void {
        this.routeCollection = null;
        this.userService.userlogout();
        this.router.navigateByUrl('/login');
    }
}