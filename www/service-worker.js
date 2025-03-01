const CACHE_NAME = 'fein-cache-' + new Date().getTime(); // キャッシュ名を現在のタイムスタンプで更新

const urlsToCache = [
 '/index.html'
];

// インストールイベント
self.addEventListener('install', event => {
 event.waitUntil(
  caches.open(CACHE_NAME)
   .then(cache => {
    return cache.addAll(urlsToCache);
   })
 );
 self.skipWaiting(); // 新しいサービスワーカーを即座に制御させる
});

// アクティブ化イベント
self.addEventListener('activate', event => {
 event.waitUntil(
  caches.keys().then(cacheNames => {
   return Promise.all(
    cacheNames.filter(function (cacheName) {
     // 現在のキャッシュ名と一致しないキャッシュを削除
     return cacheName.startsWith('fein-cache-') && cacheName !== CACHE_NAME;
    }).map(function (cacheName) {
     return caches.delete(cacheName);
    })
   );
  })
 );
 self.clients.claim(); // クライアントへの制御を即座に開始
});

// フェッチイベント
self.addEventListener('fetch', event => {
 if (event.request.mode === 'navigate') {
  // ページナビゲーションの場合はネットワーク優先
  event.respondWith(
   fetch(event.request)
    .then(response => {
     const clone = response.clone();
     caches.open(CACHE_NAME).then(cache => {
      cache.put(event.request, clone); // 最新のレスポンスをキャッシュに保存
     });
     return response;
    })
    .catch(() => {
     return caches.match(event.request); // オフライン時はキャッシュから取得
    })
  );
 } else {
  // その他のリクエストはキャッシュ優先
  event.respondWith(
   caches.match(event.request)
    .then(response => {
     return response || fetch(event.request);
    })
  );
 }
});
