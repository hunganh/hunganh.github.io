var CACHE_NAME = 'v2.7';
var CACHE_ASSETS = [
    'index.html',
    'crypto.html',
    'news.html',
    'tv-chart.html',
    'upload.html',
    'sitemap.xml',
    '/src/charting_library/vi-tv-chart.2be9706e.html',
    '/src/charting_library/bundles/0.c2df1ae4d38efcd3dc37.js',
    '/src/charting_library/bundles/1.b64c6e462261f7276e08.js',
    '/src/charting_library/bundles/1df47f578aeef40dd1f2328338a133be.png',
    '/src/charting_library/bundles/2.a0460173be1105f3b1f9.css',
    '/src/charting_library/bundles/3.1ddc0c30ba6da910062a.css',
    '/src/charting_library/bundles/4.90dade8c8bd3cf734756.js',
    '/src/charting_library/bundles/5.606bb57456de2b23e671.css',
    '/src/charting_library/bundles/6.be33a86928f55a79f98c.css',
    '/src/charting_library/bundles/7.121a50255adae11d03de.css',
    '/src/charting_library/bundles/7e0cc5f7d7f5151500dd60b8d6ca60a1.png',
    '/src/charting_library/bundles/8.64feb472d73c26e9bc6b.js',
    '/src/charting_library/bundles/9.b007f594eb5810aedb57.js',
    '/src/charting_library/bundles/10.7d7478963adcbd9a35fb.js',
    '/src/charting_library/bundles/11.4402ebd4632713d705d4.css',
    '/src/charting_library/bundles/12.7ec666bbb2e51247fe2e.js',
    '/src/charting_library/bundles/13.50b1b6fbd8839e93053f.js',
    '/src/charting_library/bundles/14.209e3b38b8b016091a8e.css',
    '/src/charting_library/bundles/15.dd24e3d870a387445f72.css',
    '/src/charting_library/bundles/16.6034eca0d6a18bc824e7.js',
    '/src/charting_library/bundles/17.65ed46fee3a02fa03610.css',
    '/src/charting_library/bundles/18.a91f6cb1b702e3645de3.js',
    '/src/charting_library/bundles/19.2c8c96aa1df882eea6db.css',
    '/src/charting_library/bundles/20.3a6e830d53b9db2f5cda.css',
    '/src/charting_library/bundles/21.96fb771e8c41caf6ef8d.css',
    '/src/charting_library/bundles/22.716534375cc525b90314.css',
    '/src/charting_library/bundles/23.c8b69d55b8f2369ad4ce.js',
    '/src/charting_library/bundles/25.83eedb0f1f7380cf2018.js',
    '/src/charting_library/bundles/26.354b722b136c103bc6fa.css',
    '/src/charting_library/bundles/27.5673bac18c6bf6dfbbd5.js',
    '/src/charting_library/bundles/29.1b9c252ca3fbb092acbf.css',
    '/src/charting_library/bundles/30.0ea1a18407c992328696.js',
    '/src/charting_library/bundles/32.fe5a236375b6f288690b.css',
    '/src/charting_library/bundles/33.8fe1f7cd5d3bdfa6cfb0.css',
    '/src/charting_library/bundles/34.77759124b88c1b8272c2.css',
    '/src/charting_library/bundles/35.a6387bf0b84a94071287.css',
    '/src/charting_library/bundles/36.bb32810019f5ff0ff82c.css',
    '/src/charting_library/bundles/37.bcfb88696eec4c008567.css',
    '/src/charting_library/bundles/38.45d0770bac092d29d448.css',
    '/src/charting_library/bundles/39.55039fef76c0b5864274.css',
    '/src/charting_library/bundles/40.ee166414faa0dac19aa0.js',
    '/src/charting_library/bundles/40f9a03d174178efb12303caa9bc7cd8.woff2',
    '/src/charting_library/bundles/41.32bf4aaf42994c025bf1.js',
    '/src/charting_library/bundles/42.ac477bbef936fe4ab452.js',
    '/src/charting_library/bundles/43.49803338470ad11003e8.css',
    '/src/charting_library/bundles/44.81e96e0912745bdfadae.js',
    '/src/charting_library/bundles/46.8ca5c4c904560cd57b9a.js',
    '/src/charting_library/bundles/47.075870f1f6d693a2244f.js',
    '/src/charting_library/bundles/48.c495071f3b1cf10d3e43.css',
    '/src/charting_library/bundles/49.428a3002cd108be5d4d9.css',
    '/src/charting_library/bundles/51.c7e11dd3467da6479858.css',
    '/src/charting_library/bundles/52.4700e289e1481659d433.css',
    '/src/charting_library/bundles/53.0c5e80c17b93d2939a84.css',
    '/src/charting_library/bundles/54.6e29c60baaf67c19d9cf.css',
    '/src/charting_library/bundles/55.3937a841c394b59e167f.css',
    '/src/charting_library/bundles/57.52f112323a265f673153.css',
    '/src/charting_library/bundles/58.311f006ba94e7c05c0bd.css',
    '/src/charting_library/bundles/59.f1ca733a83496cd1539d.css',
    '/src/charting_library/bundles/60.3cbca09f4fa2ad15e203.css',
    '/src/charting_library/bundles/61.3d5bb4c20c2593c4cd60.css',
    '/src/charting_library/bundles/63.6515fad0135e0ef2749c.css',
    '/src/charting_library/bundles/64.8863bd4336dafa15a188.css',
    '/src/charting_library/bundles/65.55c078c22a51990344a8.css',
    '/src/charting_library/bundles/66.5caf25b8722cb6e05d3b.css',
    '/src/charting_library/bundles/72.4b70e095812558722ea1.css',
    '/src/charting_library/bundles/74.b7280da3bf9f4847c4de.css',
    '/src/charting_library/bundles/76.9281221e65242ee1b2dd.css',
    '/src/charting_library/bundles/79f0e781be418df4a4d5b052ba1b61a2.png',
    '/src/charting_library/bundles/a6506134daec7169f68f563f084a9d41.svg',
    '/src/charting_library/bundles/add-compare-dialog.a3bfc1b9dd37c21175ca.js',
    '/src/charting_library/bundles/chart-bottom-toolbar.e257650695a57bcd135d.js',
    '/src/charting_library/bundles/chart-widget-gui.71bec77b9f2111aee565.js',
    '/src/charting_library/bundles/context-menu-renderer.017fc40c2d22ab321ce3.js',
    '/src/charting_library/bundles/create-dialog.64ea1b8d204c3e3ff68e.js',
    '/src/charting_library/bundles/dialogs-core.10c569e1c44290fcdba8.css',
    '/src/charting_library/bundles/dialogs-core.ae349ff7ce7ae7c99557.js',
    '/src/charting_library/bundles/drawing-toolbar.f548f9c7e5b6603158eb.js',
    '/src/charting_library/bundles/floating-toolbars.0536b8a3626d09797b72.js',
    '/src/charting_library/bundles/general-chart-properties-dialog.60008d2d71b29cc82ad1.js',
    '/src/charting_library/bundles/general-property-page.db9e5956c575f2e1ebb1.js',
    '/src/charting_library/bundles/header-toolbar.a49aceb83f84b2c30cca.js',
    '/src/charting_library/bundles/lazy-jquery-ui.3a9fe36168ca8e6cacb8.js',
    '/src/charting_library/bundles/lazy-velocity.d040cf1092d3b2920dde.js',
    '/src/charting_library/bundles/library.9eee0bfe87c02df9a38d.js',
    '/src/charting_library/bundles/library.f7cb845d6ba5ac2a5412.css',
    '/src/charting_library/bundles/line-tools-icons.508b6d21f9080fcc867b.js',
    '/src/charting_library/bundles/lt-pane-views.99fb8f6738985d70c954.js',
    '/src/charting_library/bundles/new-edit-object-dialog.102ccd36393dffd45e1c.js',
    '/src/charting_library/bundles/objecttreedialog.344cfa5ca8fd0432bea3.js',
    '/src/charting_library/bundles/polyfills.js',
    '/src/charting_library/bundles/react.e08e8f125fdcb2092328.js',
    '/src/charting_library/bundles/restricted-toolset.a91dbdd6d884576dc3c2.js',
    '/src/charting_library/bundles/runtime.eca13f690aa0da515f2a.js',
    '/src/charting_library/bundles/study-market.080c577ff80c8ae8b0a6.js',
    '/src/charting_library/bundles/study-pane-views.95b8d8cc670ff199d1aa.js',
    '/src/charting_library/bundles/symbolsearch.2c3fdef503c36745096f.js',
    '/src/charting_library/bundles/vendors.caccf34795b5aa9fb431.js',
    '/src/css/style.css',
    '/src/css/bootstrap-slider.css',
    '/src/css/bootstrap.min.css',
    '/src/css/virtual-select.min.css',
    '/src/fonts/digital-7.regular.1e670d88.ttf',
    '/src/images/bg.PNG',
    '/src/images/coin_filters.PNG',
    '/src/images/logo.svg',
    '/src/images/logo2.png',
    '/src/images/filter.png',
    '/src/js/charting_library/charting_library.min.js',
    '/src/js/common/config.js',
    '/src/js/common/extend.js',
    '/src/js/common/index.js',
    '/src/js/common/realtime.js',
    '/src/js/common/utils.js',
    '/src/js/datafeeds/bundle.js',
    '/src/js/datafeeds/polyfills.js',
    '/src/js/lib/bootstrap-slider.min.js',
    '/src/js/lib/bootstrap.bundle.min.js',
    '/src/js/lib/charting_library.min.js',
    '/src/js/lib/jquery.min.js',
    '/src/js/lib/jquery.tablednd.js',
    '/src/js/lib/lz-string.min.js',
    '/src/js/lib/socket.io.js',
    '/src/js/lib/virtual-select.min.js',
    '/src/js/bundles/boards.bundle.js',
    '/src/js/bundles/charts.bundle.js',
    '/src/js/bundles/common.bundle.js',
    '/src/js/bundles/evaluations.bundle.js',
    '/src/js/bundles/fields.bundle.js',
    '/src/js/bundles/filters.bundle.js',
    '/src/js/bundles/mobile.bundle.js',
    '/src/js/bundles/statistics.bundle.js',
    '/src/js/bundles/stocksData.bundle.js',
    '/src/js/bundles/summary.bundle.js',
    '/src/js/bundles/timeServer.bundle.js',
    '/src/js/bundles/upload.bundle.js',
    '/src/js/bundles/variables.bundle.js',
    '/src/js/bundles/websocket.bundle.js',
    '/src/js/bundles/sw.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                cache.addAll(CACHE_ASSETS);
            })
            .then(function() {
                self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});