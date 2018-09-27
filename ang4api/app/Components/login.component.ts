import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../Service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IloginModel } from '../Model/loginModel';
import { MenuComponent } from './menu.component';
import { MessageService } from '../Service/message.service';

@Component({
    templateUrl: 'app/Components/login.component.html'
})

@Injectable()
export class LoginComponent implements OnInit {
    routeCollection: any;
    loginmodel: IloginModel;
    msg: string;


    isLoginError: boolean = false;
    constructor(private userService: UserService, private router: Router, public messageService: MessageService) { }

    ngOnInit() {
        this.Logout();
        this.loginmodel = <IloginModel>{
            Userid: "",
            Password: "",
            grant_type: ""
        }
    }

    Logout() {
        console.log('first logout');
        this.userService.userlogout();
    }

    LoadMenus(): void {
        this.userService.getusermenu()
            .subscribe(routeCollection => {
                this.messageService.setMessage(routeCollection);
            },
                error => this.msg = <any>error);
    }

    authenticate() {
        this.userService.userAuthentication(this.loginmodel.Userid, this.loginmodel.Password).subscribe(
            (data: any) => {
                localStorage.setItem('userToken', data.access_token);
                this.LoadMenus();
                this.router.navigate(['/home']);
            },
            error => {
                this.msg = error;
            });
    }

}