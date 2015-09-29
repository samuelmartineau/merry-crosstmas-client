 module.exports = {
     // Returns a function, that, as long as it continues to be invoked, will not
     // be triggered. The function will be called after it stops being called for
     // N milliseconds. If `immediate` is passed, trigger the function on the
     // leading edge, instead of the trailing.
     debounce: function(func, wait, immediate) {
         'use strict';
         var timeout;
         return function() {
             var context = this,
                 args = arguments;
             var later = function() {
                 timeout = null;
                 if (!immediate) {
                     func.apply(context, args);
                 }
             };
             var callNow = immediate && !timeout;
             clearTimeout(timeout);
             timeout = setTimeout(later, wait);
             if (callNow) {
                 func.apply(context, args);
             }
         };
     },

     findById: function(source, id, i) {
         'use strict';
         for (i = 0; i < source.length; i++) {
             if (source[i].id === id) {
                 return source[i];
             }
         }
         throw 'Couldn\'t find object with id: ' + id;
     },

     validateEmail: function(email) {
         'use strict';
         var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
         return re.test(email);
     }
 };
