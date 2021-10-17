if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw_cached.js').then(function(registration) {
        console.log('ServiceWorker registration successful');
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }