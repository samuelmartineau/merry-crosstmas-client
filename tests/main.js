var test = require('tape');
var config = require('../config');
var riot = require('riot');
var ContactModel = require('../src/scripts/models/contact.js');

test('[Test ContactModel]', function(t) {
    t.plan(2);

    var contactModel = new ContactModel({riot: riot});

    t.true(contactModel.contacts && contactModel.contacts.length === 3, 'ContactModel constructor should init an array of contacts with at least 3 people');

    contactModel.add();
    t.true(function(){
      var hasGoodSize = contactModel.contacts.length === 3;
      var hasGoodContent = contactModel[2].name === '' && contactModel[2].mail === '';
      return hasGoodSize && hasGoodContent;
    }, 'ContactModel.add should add a contact');


});
