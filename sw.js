'use strict';
const CACHE='hippique-entry-20261106-v2';
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('hippique-systeme-pro-')||(key.startsWith('hippique-entry-')&&key!==CACHE)).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(new Request(event.request,{cache:'no-store'}));if(response.ok)await cache.put(event.request,response.clone());return response;}catch(error){const saved=await cache.match(event.request);if(saved)return saved;throw error;}})());
});
