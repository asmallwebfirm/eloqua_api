/**
 * @file Asynchronous tracking for Eloqua.
 */

var _elqQ = _elqQ || [];

Drupal.behaviors.eloquaApiTracking = {
  attach: function (context, settings) {
    if (context === document) {

      if (typeof settings.eloqua_api.siteId !== 'undefined') {
        _elqQ.push(['elqSetSiteId', settings.eloqua_api.siteId]);
        _elqQ.push(['elqTrackPageView']);
      }

      function async_load() {
        if (typeof settings.eloqua_api.trackingRemoteUrl !== 'undefined') {
          var s = document.createElement('script'),
              x = document.getElementsByTagName('script')[0];
          s.src = settings.eloqua_api.trackingRemoteUrl;
          s.type = 'text/javascript';
          s.async = true;
          x.parentNode.insertBefore(s, x);
        }
      }
      if (window.addEventListener) window.addEventListener('load', async_load, false);
      else if (window.attachEvent) window.attachEvent('onload', async_load);

    }
  }
};
