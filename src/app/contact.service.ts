import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const MIN_CONTACT = 3;

function removeItem(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1))
}


@Injectable()
export class ContactService {
  contacts: Observable<Contact[]>
  private _contacts: BehaviorSubject<Contact[]>;
  private contactStore: { contacts: Contact[], contactsValidity: boolean };
  contactsValidity: Observable<boolean>;
  private _contactsValidity: Subject<boolean>;

  constructor() {
    this.contactStore = { contacts: Array.apply(null, {length: MIN_CONTACT}).map(() => new Contact()), contactsValidity: false };
    this._contacts = new BehaviorSubject([...this.contactStore.contacts]);
    this.contacts = this._contacts.asObservable();

    this._contactsValidity = new Subject();
    this._contactsValidity.next(this.contactStore.contactsValidity);
    this.contactsValidity = this._contactsValidity.asObservable();
  }

  updateContactValidity(validity: boolean) {
    this.contactStore.contactsValidity = validity;
    this._contactsValidity.next(Object.assign({}, this.contactStore).contactsValidity);
  }

  addContact() {
    this.contactStore.contacts.push(new Contact())
    this._contacts.next(this.contactStore.contacts);
  }

  removeContactByIndex(index): void {
    this.contactStore.contacts.splice(index, 1);
    this._contacts.next(Object.assign({}, this.contactStore).contacts);
  }
}
