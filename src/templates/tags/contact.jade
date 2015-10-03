contact
  .card
    i.card__remove(if='{contactModel.contacts.length > 3}' onclick='{ removeContact }') Remove
    .md-input(class='{ show: nameValid }')
      input(type="text" required onkeyup='{ changeName }')
      span.highlight
      span.bar
      label Name
      i.valid.icon.icon-check
    .md-input(class='{ show: validMail }')
      input(type="text" required onkeyup='{ changeMail }')
      span.highlight
      span.bar
      label Mail
      i.valid.icon.icon-check

  script.
    changeName = window.utils.debounce(function(e) {
        var value = e.target.value;
        contactModel.editName(this.opts.contact.id, value);
        this.nameValid = value.length > 0;
        this.update();
    }, 300);

    changeMail = window.utils.debounce(function(e) {
        var value = e.target.value;
        contactModel.editMail(this.opts.contact.id, value);
        this.validMail = window.utils.validateEmail(value);
        this.update();
    }, 300);

    var self = this;
    this.on('mount', function(){
      var lastElement = contactModel.contacts[contactModel.contacts.length-1];
      if (contactModel.contacts.length > 3 && self.opts.contact.id === lastElement.id) {
        // DOM is not render when on mount event is triggered and isMounted is true
        // https://github.com/riot/riot/issues/1033
        setTimeout(function(){
          window.smoothScroll(self.root, 500);
        }, 0);
      }
    })

    removeContact() {
      contactModel.remove(self.opts.contact.id);
    }

    contactModel.on('error', function(id){
      if (self.opts.contact.id === id) {
        window.smoothScroll(self.root, 500, function(){console.log('end')});
      }
    })
