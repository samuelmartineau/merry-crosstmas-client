contacts-list
  .contact-list
    contact(each='{contactModel.contacts}' data='{this}')

    button(onclick='{contactModel.add}') Add Friend

    button(onclick='{contactModel.send}') Send Mails
