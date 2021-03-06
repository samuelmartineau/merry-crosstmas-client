var test = require('tape');
var config = require('../config/config');
var riot = require('riot');
var ContactModel = require('../src/scripts/models/contact.js');

test('[Test ContactModel]', function(t) {
    t.plan(5);

    var contactModel = new ContactModel({riot: riot});

    t.true(contactModel.contacts && contactModel.contacts.length === 3, 'ContactModel constructor should init an array of contacts with at least 3 people');

    contactModel.add();
    t.true(function(){
      var hasGoodSize = contactModel.contacts.length === 3;
      var hasGoodContent = contactModel[2].name.value === '' && contactModel[2].mail.value === '';
      return hasGoodSize && hasGoodContent;
    }, 'ContactModel.add should add a contact');

    contactModel.editName(0, 'test');
    t.true(contactModel.contacts[0].name.value === 'test', 'ContactModel.editName should edit the name of contact (id)');

    contactModel.editMail(0, 'test@mail.fr');
    t.true(contactModel.contacts[0].mail.value === 'test@mail.fr', 'ContactModel.editMail should edit the mail of contact (id)');

    contactModel.remove(0);
    t.true(contactModel.contacts[0].id != 0 && contactModel.contacts.length === 3, 'ContactModel.remove should remove the contact with (id)');

    contactModel.send();

});
