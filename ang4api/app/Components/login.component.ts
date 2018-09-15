import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../Service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IloginModel } from '../Model/loginModel';

@Component({
    templateUrl: 'app/Components/login.component.html'
})

@Injectable()   
export class LoginComponent implements OnInit {
    loginmodel: IloginModel;
    msg: string;


    isLoginError: boolean = false;
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.loginmodel = <IloginModel>{
            Userid: "",
            Password: "",
            grant_type:""
        }
    }

    authenticate() {
        this.userService.userAuthentication(this.loginmodel.Userid, this.loginmodel.Password).subscribe(
            (data: any) => {
            localStorage.setItem('userToken', data.access_token);
            this.router.navigate(['/home']);
        },
            error => {
                this.msg = error;
            });
    }

}