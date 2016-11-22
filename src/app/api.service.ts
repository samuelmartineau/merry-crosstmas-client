import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { environment } from '../environments/environment';
import { ContactService } from './contact.service';
import { EditorService } from './editor.service';

interface ContactServer {
  name: string;
  mail: string;
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
        const content = this._editorService.get();
        const serverContacts = contacts.map(contact => <ContactServer>{
          name: contact.name,
          mail: contact.email
        });
        return {
          contacts: serverContacts,
          content: content
        };
      })
      .flatMap((data) => this.http.post(environment.baseUrl + 'send', data))
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error);
  }

}
