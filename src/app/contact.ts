import uuid from 'uuid';

export class Contact {
  name: string;
  email: string;
  nameId: string;
  emailId: string;
  canBeRemoved: boolean;
  constructor() {
    this.name = '';
    this.email = '';
    this.nameId = uuid.v1();
    this.emailId = uuid.v1();
  }
}