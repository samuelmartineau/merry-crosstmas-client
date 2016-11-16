import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ContactService, MIN_CONTACT } from '../contact.service';
import { Contact } from '../contact';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ContactsComponent {
  complexForm: FormGroup;
  contacts: Observable<Array<Contact>>;
  canBeRemoved: boolean;
  
  constructor(private _contactService: ContactService, fb: FormBuilder) {
    this.complexForm = fb.group({
    })
    this._contactService.contacts
      .subscribe(contacts => {
        this.canBeRemoved = contacts.length > MIN_CONTACT;
        contacts.forEach(contact => {
          this.complexForm.addControl(contact.nameId, new FormControl('', Validators.required));
          this.complexForm.addControl(contact.emailId, new FormControl('', Validators.compose([Validators.required, <any>Validators.pattern(emailRegex)])));
        });
      });
    this.complexForm.valueChanges.subscribe( (form: any) => {
      this._contactService.updateContactValidity(this.complexForm.valid);
    });
  }

  ngOnInit() {
    this.contacts = this._contactService.contacts;
  }

}
