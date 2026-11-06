'use strict';
const CURRENT='https://gillesgallon.github.io/Amigo-syst-me-pro/hippique/';
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('hippique-systeme-pro-')).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method==='GET'&&event.request.mode==='navigate'&&url.origin===self.location.origin&&url.pathname.startsWith('/Amigo-/'))event.respondWith(Promise.resolve(Response.redirect(CURRENT+url.search+url.hash,302)));});
