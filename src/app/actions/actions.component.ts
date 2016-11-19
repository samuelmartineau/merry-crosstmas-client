import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  isSendable: boolean;
  isSending: boolean;

  constructor(private _contactService:ContactService, private _apiService:ApiService) {
    this._contactService.contactsValidity
      .subscribe(validity => {
        this.isSendable = validity;
      });
   }

  addContact(): void {
    this._contactService.addContact();
  }

  send() {
    this.isSending = true;
    this._apiService
      .send()
      .subscribe(response=>{
        this.isSending = false;
      }, () => console.log, () => console.log);
  }

  ngOnInit() {
  }

}
