import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    private alert = {
        'to': '',
        'message' : ''
    };

    constructor() { }

    public getAlert() {
        return alert;
    }

    public setAlert(to, message) {
        this.alert.to = to;
        this.alert.message = message;
    }
}
