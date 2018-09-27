import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IkeyValuePair } from '../Model/keyValuePair';


@Injectable()
export class MessageService {
    public message = new Subject<IkeyValuePair[]>();
    setMessage(value: IkeyValuePair[]) {
        this.message.next(value); 
    }
}