import { Component, Directive, ElementRef, HostListener, Input, Output, EventEmitter ,OnInit} from '@angular/core';
import { IkeyValuePair } from '../Model/keyValuePair';

@Component({
    selector: 'dropdown',
    template: `                           <select  class="form-control" [(ngModel)]="selecId" (change)="onSelect($event.target.value)" >
                                <option *ngFor="let coll of drpcollection" [value]="coll.Id" selected="{{coll.Id ==selecId?true:null}}">{{coll.keyValue}}</option>
                            </select>`
})

export class DropdownComponent implements OnInit {
    @Input() selecId: number;
    // @Input() attrid: string;
    @Input() drpcollection: IkeyValuePair[];
    @Output() drpselceted: Number;

    ngOnInit(): void {
        this.drpselceted = this.selecId;
    }

    onSelect(drpselected:Number) {
        this.drpselceted = null;
        for (var i = 0; i < this.drpcollection.length; i++) {
            if (this.drpcollection[i].Id == drpselected) {
                this.drpselceted = this.drpcollection[i].Id;
            }
        }
    }

}