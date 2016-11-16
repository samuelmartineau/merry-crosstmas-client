import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  isSendable: boolean;

  constructor(private _contactService:ContactService) {
    this._contactService.contactsValidity
      .subscribe(validity => {
        this.isSendable = validity;
      });
   }

  addContact(): void {
    this._contactService.addContact();
  }

  send() {
    
  }

  ngOnInit() {
  }

}
