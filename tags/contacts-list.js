riot.tag("contacts-list",'<p class="explanation">Complete your friends informations (minimum 3 people)</p><div class="container"><div class="contact-list"><contact each="{contact in contactModel.contacts}" contact="{contact}"></contact></div><div class="contact-control"><div class="contact-control__cell"><i onclick="{addContact}" class="badge icon icon-group"></i></div><div class="contact-control__cell"><button __disabled="{!isSendable}" class="badge { invalid: !isSendable }"><i onclick="{sendMails}" class="icon icon-paper"></i></button></div></div></div>',function(t){var n=this;n.isSendable=contactModel.isValid(),contactModel.on("remove",function(){n.isSendable=contactModel.isValid(),n.update()}),contactModel.on("mailsUpdated",function(){n.isSendable=contactModel.isValid(),n.update()}),contactModel.on("add",function(){n.isSendable=contactModel.isValid(),n.update()}),contactModel.on("nameUpdated",function(){n.isSendable=contactModel.isValid(),n.update()}),this.addContact=function(){ga("send","event",{eventCategory:"add friend",eventAction:"Click"}),contactModel.add()},this.sendMails=function(){ga("send","event",{eventCategory:"send mail",eventAction:"Click"}),contactModel.send().then(function(){riot.mount("result"),n.unmount()},function(t,n){alert("server error")})}});