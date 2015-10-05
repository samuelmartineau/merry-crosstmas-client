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
        previous;

    // minimum of contacts
    self.minimum = contactMinimum;

    // array of contacts name + mail
    self.contacts = [];

    // html mail content string
    self.content = '';

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
        cleanMails(currentContact.value);
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
        currentContact = utils.findById(self.contacts, id).mail;
        previous = currentContact.value;
        currentContact.value = value;
        currentContact.edited = true;
        currentContact.valid = updateMails(value, id);
        cleanMails(previous);
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
            parameters = {
                contacts: self.contacts,
                content: self.content
            };

            return new Promise(function(resolve, reject) {
                globalWindow.qwest.post('/send', parameters, config)
                    .then(function(data) {
                        return resolve(data);
                    })
                    .catch(function(e, url) {
                        return reject(e, url);
                    });
            });
        }
    };

    // Private methods
    function updateMails(mail, id) {
        errors = false;
        self.contacts.forEach(function(contact) {
            if (contact.mail.value === mail && contact.id !== id) {
                errors = true;
                contact.mail.valid = false;
            }
        });
        return utils.validateEmail(mail) && !errors;
    }

    function cleanMails(mail) {
        errors = [];
        self.contacts.forEach(function(contact, index) {
            if (contact.mail.value === mail) {
                errors.push(index);
            }
        });
        if (errors.length === 1 && utils.validateEmail(self.contacts[errors[0]].mail.value)) {
            self.contacts[errors[0]].mail.valid = true;
        }
    }
};

module.exports = ContactModel;
