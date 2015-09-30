contacts-list
  .contact-list
    contact(each='{contact in contactModel.contacts}' contact='{contact}')

  .contact-control
    .contact-control__cell
      i.badge.icon.icon-group(onclick='{contactModel.add}')

    .contact-control__cell
      i.badge.icon.icon-paper(onclick='{contactModel.send}')

  script.
    var self = this;

    contactModel.on('remove', function(id){
      self.update();
    })
