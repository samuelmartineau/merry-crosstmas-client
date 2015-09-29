var ContactModel = function(globalWindow) {
    'use strict';
    var self = globalWindow.riot.observable(this),
        currentId = 2,
        global = globalWindow;

    self.contacts = [{
        name: '',
        mail: '',
        id: 0
    }, {
        name: '',
        mail: '',
        id: 1
    }, {
        name: '',
        mail: '',
        id: 2
    }];

    self.add = function() {
        self.contacts.push({
            name: '',
            mail: '',
            id: ++currentId
        });
        self.trigger('add');
    };

    self.editName = function(id, value) {
        global.utils.findById(self.contacts, id).name = value;
        self.trigger('edit');
    };

    self.editMail = function(id, value) {
        global.utils.findById(self.contacts, id).mail = value;
        self.trigger('edit');
    };

    self.send = function() {
        if (isValid()) {
            // TODO send
        }
    };

    // sync database
    self.on('add remove toggle edit', function() {
        // TODO
    });

    // Private methods
    function isValid() {
        return self.contacts.every(function(contact) {
            var valid = contact.name.length > 0 && window.utils.validateEmail(contact.mail);
            if (!valid) {
                self.trigger('error', contact.id);
            }
            return valid;
        });
    }

};

module.exports = ContactModel;
