import {
  Component, Input, OnInit, Output, ViewChild, ElementRef
} from '@angular/core';
import { Contact } from '../contact';
import { FormGroup } from '@angular/forms';
import {ContactService} from '../contact.service';
import smoothScroll from 'smoothscroll';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactElement') el:ElementRef;
  @Input() contact: Contact;
  @Input() complexForm: FormGroup;
  @Input() index: number;
  @Input() canBeRemoved: boolean;
  @Input() isLast: boolean;
  
  constructor(private _contactService:ContactService) {
  }

  removeContact(event, index) {
    event.stopPropagation();
    this.complexForm.removeControl(this.contact.nameId);
    this.complexForm.removeControl(this.contact.emailId);
    this._contactService.removeContactByIndex(index);
  }

  ngAfterViewInit() {
    if (this.isLast && this.canBeRemoved) {
      smoothScroll(this.el.nativeElement, 500);
    }
  }

  ngOnInit() {
  }

}
