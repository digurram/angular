import { Component, Input, SimpleChange, OnInit } from '@angular/core';
import { IkeyValuePair } from '../Model/keyValuePair';
import { Form, FormGroup, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'dropdown',
    template: ` <select  class="form-control"   >
                                <option value=-1>Select</option>
                                <option *ngFor="let coll of drpcollection" [value]="coll.Id" [selected]="coll.Id ==selecId"  (change)="pushChange($event)">{{coll.keyValue}}</option>
                            </select>`
})

export class DropdownComponent implements ControlValueAccessor {

    private _selecId: number;
    show: boolean = false;

    onChange = (_: any) => { };
    onTouched = () => { };

    @Input() ctrname: string;

    constructor() {
        console.log(this.selecId);
        this._selecId = this.selecId;
    }

    @Input()
    set selecId(val: number) {
        console.log('in set ->' + val);
        this._selecId = val;
        //this.parentForm.controls[this.ctrname].value = val;
    }
    get selecId(): number {
        console.log('in get ->' + this._selecId);
        return this._selecId;
    }

    //@Input() parentForm:FormGroup

    @Input() drpcollection: IkeyValuePair[];

    writeValue(value: any): void {
        this._selecId = value || -1;
    }

    pushChange(event: any) {
        this._selecId  = event.target.value;
        console.log('new value is ' + this._selecId);
        this.writeValue(this._selecId);
        this.onChange(this._selecId);
    }


    registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
    registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void {
    }
}