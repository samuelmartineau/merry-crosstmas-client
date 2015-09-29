'use strict';

function Contact() {
    var self = riot.observable(this),
        currentId = 2;

    self.contacts = [
      { name: '', mail: '' , id: 0},
      { name: '', mail: '', id: 1 },
      { name: '', mail: '', id: 2 }
    ];

    self.add = function(done) {
        self.contacts.push({ name: '', mail: '' , id: ++currentId});
        self.trigger('add');
    };

    self.editName = function(id, value, done) {
        window.utils.findById(self.contacts, id).name = value;
        self.trigger('edit');
    };

    self.editMail = function(id, value, done) {
        window.utils.findById(self.contacts, id).mail = value;
        self.trigger('edit');
    };

    self.send = function(id, value, done) {
        if(isValid()){
            // TODO send
        }
    };

    // sync database
    self.on('add remove toggle edit', function() {
        console.log('sam');
        // TODO
    });

    // Private methods
    function isValid() {
        return self.contacts.every(function(contact){
          var valid = contact.name.length > 0 && window.utils.validateEmail(contact.mail);
          if (!valid) {
            self.trigger('error', contact.id);
          }
          return valid;
        });
    }

};
