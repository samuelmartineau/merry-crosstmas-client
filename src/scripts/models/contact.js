var utils = require('../utils');

var ContactModel = function(globalWindow) {
    'use strict';
    var self = globalWindow.riot.observable(this),
        currentId = 2,
        parameters,
        config;

    self.content = '';

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
    };

    self.remove = function(id) {
        self.contacts.splice(utils.findIndex(self.contacts, id), 1);
        self.trigger('remove', id);
    };

    self.editName = function(id, value) {
        utils.findById(self.contacts, id).name = value;
    };

    self.editMail = function(id, value) {
        utils.findById(self.contacts, id).mail = value;
    };

    self.editContent = function(newContent) {
        self.content = newContent;
    };


    self.send = function() {
        if (isValid()) {
            parameters = {
                contacts: self.contacts,
                content: self.content
            };
            config = {
                responseType: 'json',
                timeout: 10000,
                attempts: 1
            };

            globalWindow.qwest.post('/send', parameters, config)
                .then(function(xhr, response) {
                    // Make some useful actions
                    console.log(response);
                })
                .catch(function(xhr, response, e) {
                    // Process the error
                    console.log(e);
                });
        }
    };

    // Private methods
    function isValid() {
        var fieldsNotEmpty = self.contacts.every(function(contact) {
            var valid = contact.name.length > 0 && utils.validateEmail(contact.mail);
            if (!valid) {
                self.trigger('error', contact.id);
            }
            return valid;
        });

        var uniqMails = utils.uniq(self.contacts, 'mail');

        return fieldsNotEmpty && uniqMails;
    }

};

module.exports = ContactModel;
