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
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/catch';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

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
  isSending: boolean;
  complexForm: FormGroup;
  contacts: Observable<Array<Contact>>;
  canBeRemoved: boolean;

  constructor(public toastr: ToastsManager, private _contactService: ContactService, fb: FormBuilder, private _apiService: ApiService) {
    this.complexForm = fb.group({});
    this._contactService.contacts
      .subscribe(contacts => {
        this.canBeRemoved = contacts.length > MIN_CONTACT;

        contacts.forEach(contact => {
          this.complexForm.addControl(contact.nameId, new FormControl('', Validators.required));
          this.complexForm.addControl(contact.emailId, new FormControl('', Validators.compose([Validators.required, <any>Validators.pattern(emailRegex)])));
        });
      });
    this.complexForm.valueChanges.subscribe((form: any) => {
      this._contactService.updateContactValidity(this.complexForm.valid);
    });
  }

  onSubmit() {
    this.isSending = true;
    const calling = this._apiService
      .send()
      .finally(() => this.isSending = false)
      .subscribe(response => {
        console.log(this.complexForm)
        Object.keys(this.complexForm.controls).forEach(id => this.complexForm.removeControl(id))
        calling.unsubscribe();
        this.complexForm.reset();
        this.toastr.success('Your Emails have been sent successfully :)', 'Success!');
        this._contactService.reset();
      }, () => {
        calling.unsubscribe();
        this.toastr.error('An error occured, please try again later!', 'Error!');
      });
  }

  ngOnInit() {
    this.contacts = this._contactService.contacts;
  }

}
