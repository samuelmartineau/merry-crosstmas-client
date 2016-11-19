import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { ContactService } from './contact.service';
import { EditorService } from './editor.service';

interface ContactServer {
  name: string;
  email: string;
}


@Injectable()
export class ApiService {

  constructor(
    public http: Http,
    private _contactService: ContactService,
    private _editorService: EditorService) { }

  send() {
    return this._contactService.contacts
      .map((contacts) => {
        const content: string = this._editorService.get();
        const serverContacts = contacts.map(contact => <ContactServer>{
          name: contact.name,
          email: contact.email
        });
        console.log(environment);
        return this.http.post(environment.baseUrl + 'send', {
          contacts: serverContacts,
          content: content
        })
          .map(res => res.json())
          .catch(this.handleError)
          .subscribe();
      });
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || ' error');
  }

}
