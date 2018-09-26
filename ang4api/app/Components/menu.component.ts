import { Component, Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Injectable } from '@angular/core';
import { IkeyValuePair } from '../Model/keyValuePair';
import { UserService } from '../Service/user.service';

@Injectable()
@Component({
    selector: 'menuitems',
    template: `<div *ngIf='tickets'>
    <nav class='navbar navbar-inverse' >
        <div class='container-fluid' >
            <ul class='nav navbar-nav' >
               <li  *ngFor="let cols of routeCollection"> <a [routerLink]="[cols.key]" > {{ cols.keyValue }} </a></li >
            </ul>
        </div>
      </nav>
        </div>`
})

export class MenuComponent implements OnInit {
    msg: any;
    routeCollection: IkeyValuePair[];

    constructor(private userService: UserService) {
        this.routeCollection = [];
    }

    ngOnInit(): void {
        this.LoadMenus();
    }

    LoadMenus(): void {
        this.userService.getusermenu()
            .subscribe(routeCollection => { this.routeCollection = routeCollection; },
                error => this.msg = <any>error);
    }
}