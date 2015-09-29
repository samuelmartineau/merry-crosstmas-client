contact
  .card
    h1 {this.title}
    .md-input(class='{ show: nameValid }')
      input(type="text" required onkeyup='{ changeName }')
      span.highlight
      span.bar
      label Name
      img.valid(src="assets/icons/check.svg" alt="check")
    .md-input(class='{ show: validMail }')
      input(type="text" required onkeyup='{ changeMail }')
      span.highlight
      span.bar
      label Mail
      img.valid(src="assets/icons/check.svg" alt="check")

  script.
    var self = this;
    changeName = window.utils.debounce(function(e) {
        var value = e.target.value;
        contactModel.editName(this.id, value);
        self.nameValid = value.length > 0;
        self.update();
    }, 300);

    changeMail = window.utils.debounce(function(e) {
        var value = e.target.value;
        contactModel.editMail(this.id, value);
        self.validMail = window.utils.validateEmail(value);
        self.update();
    }, 300);

    self.on('mount', function(){
      var lastElement = contactModel.contacts[contactModel.contacts.length-1];
      if (contactModel.contacts.length > 3 && self.opts.data.id === lastElement.id) {
        // DOM is not render when on mount event is triggered and isMounted is true
        // https://github.com/riot/riot/issues/1033
        setTimeout(function(){
          window.smoothScroll(self.root, 500, function(){console.log('end update')});
        }, 0);
      }
    })

    contactModel.on('error', function(id){
      if (self.id === id) {
        window.smoothScroll(self.root, 500, function(){console.log('end')});
      }
    })
