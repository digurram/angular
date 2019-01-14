import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AddUserModel } from '../Model/adduserModel';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/Components/adduser.component.html'
})
export class AddUserComponent implements OnInit {
    addUserForm: FormGroup;
    routeCollection: any;
    addUsermodel: AddUserModel;
    msg: string;
    isValidationError: boolean = false;

    constructor(private adminService: AdminService, private router: Router, private formBuilder: FormBuilder) {

    }



    ngOnInit(): void {
        this.addUsermodel = new AddUserModel();

        this.addUserForm = this.formBuilder.group({
            'FirstName': new FormControl(this.addUsermodel.FirstName, [Validators.required]),
            'LasttName': new FormControl(this.addUsermodel.LastName, [Validators.required]),
            'EmailId': new FormControl(this.addUsermodel.EmailId, [Validators.required, Validators.email])
        });


    }

    adduser() {
        if (this.addUserForm.status == 'INVALID') {
            return;
        }
        const result: AddUserModel = Object.assign({}, this.addUserForm.value);
        this.addUserForm.reset();
        console.log(result);

    }
}