contacts-list
  .contact-list
    contact(each='{ contacts }' data='{ this }')

  button(onclick='{addFriend}') Add Friend

  script.
    this.currentId = 2;
    this.contacts = [
      { name: '', mail: '' , id: 0},
      { name: '', mail: '', id: 1 },
      { name: '', mail: '', id: 2 }
    ];

    addFriend(event) {
       this.contacts.push({ name: '', mail: '', id: ++this.currentId });
    }
