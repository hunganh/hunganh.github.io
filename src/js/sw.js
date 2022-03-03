if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw_cached.js').then(function (registration) {
      registration.addEventListener('updatefound', (newWorker) => {
        if (navigator.serviceWorker.controller) {
          showUpdateNewVersionPopup();
        }
      });
      console.log('ServiceWorker registration successful');
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function showUpdateNewVersionPopup() {
  var newVersionMessageToast = $("#upadateNewVersionMessageToast");
  if (newVersionMessageToast.css("display") !== "block") {
    newVersionMessageToast.toast({
          autohide: false
    }).show(); 
  }
}

function updateNewVersionSW() {
  window.location.reload(true);
}