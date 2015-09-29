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
        contact.editName(this.id, value);
        this.nameValid = value.length > 0;
        this.update();
    }, 300);

    changeMail = window.utils.debounce(function(e) {
        var value = e.target.value;
        contact.editMail(this.id, value);
        this.validMail = window.utils.validateEmail(value);
        this.update();
    }, 300);

    this.on('update', function(){
      if (this.parent.id > 2) {
        window.smoothScroll(this.root, 500);
      }
    })

    contact.on('error', function(id){
      if (self.id === id) {
        debugger;
        window.smoothScroll(self.root, 500);
      }
    })
