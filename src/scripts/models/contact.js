var utils = require('../utils');
var Promise = require('promise');

var ContactModel = function(globalWindow) {
    'use strict';
    var self = globalWindow.riot.observable(this),
        currentId = 0,
        contactMinimum = 3,
        config = {
            responseType: 'json',
            timeout: 10000,
            attempts: 1
        },
        defaultContact = {
            name: {
                value: '',
                edited: false,
                valid: false
            },
            mail: {
                value: '',
                edited: false,
                valid: false
            }
        },
        errors,
        parameters,
        currentContact,
        mails,
        result,
        filtered,
        previous;

    // minimum of contacts
    self.minimum = contactMinimum;

    // array of contacts name + mail
    self.contacts = [];

    // html mail content string
    self.content = '<div style=\'text-align: center;\'><span style=\'font-size: 32px;\'>Hello!!!</span></div><div style=\'text-align: center;\'><br></div><div>Do you remember our conversation? We decided to set up a Santa gift exchange between friends with a budget of <b>20$</b></div><div><br></div><div>You have to find a gift for @friend, good luck :)</div><div><br></div><div>See you at the end of the year</div>';

    // init first contacts
    Array.apply(null, Array(contactMinimum)).forEach(function() {
        currentContact = JSON.parse(JSON.stringify(defaultContact));
        currentContact.id = currentId++;
        self.contacts.push(currentContact);
    });

    self.add = function() {
        currentContact = JSON.parse(JSON.stringify(defaultContact));
        currentContact.id = currentId++;
        self.contacts.push(currentContact);
        self.trigger('add');
    };

    self.remove = function(id) {
        currentContact = utils.findById(self.contacts, id).mail;
        self.contacts.splice(utils.findIndex(self.contacts, id), 1);
        updateMails(currentContact.value);
        self.trigger('remove', id);
    };

    self.editName = function(id, value) {
        currentContact = utils.findById(self.contacts, id).name;
        currentContact.value = value;
        currentContact.edited = true;
        currentContact.valid = value.length > 0;
        self.trigger('nameUpdated');
    };

    self.editMail = function(id, value) {
        previous = utils.findById(self.contacts, id).mail.value;
        currentContact = utils.findById(self.contacts, id).mail;
        currentContact.value = value;
        currentContact.edited = true;
        updateMails(previous);
        updateMails(value);
        self.trigger('mailsUpdated');
    };

    self.editContent = function(newContent) {
        self.content = newContent;
    };

    self.isValid = function() {
        mails = [];
        return self.contacts.every(function(contact) {
            errors = contact.name.value.length > 0 && utils.validateEmail(contact.mail.value) && mails.indexOf(contact.mail.value) === -1;
            mails.push(contact.mail.value);
            return errors;
        });
    };

    self.send = function() {
        if (self.isValid()) {

            result = self.contacts.map(function(contact) {
                return {
                    name: contact.name.value,
                    mail: contact.mail.value
                };
            });

            parameters = {
                contacts: result,
                content: self.content
            };

            return new Promise(function(resolve, reject) {
                globalWindow.qwest.post('/send', parameters, config)
                    .then(function(data) {
                        self.trigger('sent');
                        return resolve(data);
                    })
                    .catch(function(e, url) {
                        return reject(e, url);
                    });
            });
        }
    };

    // Private methods
    function updateMails(mail) {
        filtered = self.contacts.filter(function(contact) {
            return contact.mail.value === mail;
        });

        if (filtered.length > 1) {
            filtered.forEach(function(contact) {
                contact.mail.valid = false;
            });
        } else if (filtered.length === 1 && utils.validateEmail(filtered[0].mail.value)) {
            filtered[0].mail.valid = true;
        }
    }
};

module.exports = ContactModel;
