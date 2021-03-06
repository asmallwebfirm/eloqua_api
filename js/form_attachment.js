Drupal.behaviors.eloquaApiForm = {
  attach: function(context) {
    if (context === document) {

      // Poll to see if the function to get the ELQ customer GUID is available.
      var elqCustomerLoaded = setInterval(function () {
        // If the function is not available, attempt to load the function.
        if (typeof GetElqCustomerGUID !== 'function') {
          // Poll to see if the _elqQ variable is available every 1/2 second.
          // Once it is, push elqGetCustomerGUID to load the global function.
          var elqLoaded = setInterval(function() {
            if (typeof _elqQ !== 'undefined') {
              _elqQ.push(['elqGetCustomerGUID']);
              clearInterval(elqLoaded);
            }
          }, 500);
        }
        // Once the function is available, write in the value of the hidden field.
        else {
          // User input name for appending.
          var inputs = document.getElementsByTagName('input');
          for (var i=0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('name') === 'eloqua_api_cid') {
              inputs[i].value = GetElqCustomerGUID();
            }
          }
          clearInterval(elqCustomerLoaded);
        }
      }, 500);

    }
  }
};
