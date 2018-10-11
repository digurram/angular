import { Component, Input, SimpleChange, OnInit } from '@angular/core';
import { IkeyValuePair } from '../Model/keyValuePair';
import { Form, FormGroup } from '@angular/forms';

@Component({
    selector: 'dropdown',
    template: ` <select  class="form-control"  [formGroup]="parentForm"  [formControlName]="ctrname">
                                <option value=-1>Select</option>
                                <option *ngFor="let coll of drpcollection" [value]="coll.Id" [selected]="coll.Id ==parentForm.controls[ctrname].value">{{coll.keyValue}}</option>
                            </select>`
})

export class DropdownComponent {

    private _selecId: number;

    @Input() ctrname: string;

    @Input()
    set selecId(val: number) {
        this._selecId = val;
        //this.parentForm.controls[this.ctrname].value = val;
    }
    get selecId(): number {
        return this._selecId;
    }

    @Input() parentForm:FormGroup

    @Input() drpcollection: IkeyValuePair[];
}