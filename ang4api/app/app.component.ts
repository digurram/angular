import { Component, transition } from '@angular/core';
import { Itdictionary } from './Model/tdictionary';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from './auth/auth.guard';

@Component({
    selector: 'my-app',
    template: `
                    <nav class='navbar navbar-inverse'>
                        <div class='container-fluid'>
                            <ul class='nav navbar-nav'>
                                <li  *ngFor="let cols of routeCollection"><a [routerLink]="[cols.key]">{{cols.keyValue}}</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div class='container'>
                        <router-outlet></router-outlet>
                    </div>
                `
})
export class AppComponent {
    routeCollection: Itdictionary[];
    constructor(private titleService: Title) {
        this.routeCollection = [];
        if (this.isloggedin()) {
            this.routeCollection.push({ "key": "home", "keyValue": "Home" });
            this.routeCollection.push({ "key": "Admin", "keyValue": "Admin Setup" });
            this.routeCollection.push({ "key": "Ticket", "keyValue": "Ticket" });
        }
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }


    private isloggedin(): boolean {
        if (localStorage.getItem('userToken') != null) {
         return   true;
        }
        else {
            return   false;
        }
    }


}
