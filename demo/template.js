$(document).ready(function(){
  var launcher = $('.intercom-launcher');
  var messenger = $('.intercom-messenger');
  var closeBtn = $('.intercom-sheet-header-close-button');
  launcher.click(function() {
    messenger.show();
  });
  closeBtn.click(function() {
    messenger.hide();
  });

});
