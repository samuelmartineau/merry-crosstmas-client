contacts-list
  .contact-list
    contact(each='{ contact.contacts }' data='{ this }')

    button(onclick='{contact.add}') Add Friend

    button(onclick='{contact.send}') Send Mails
