const C="bespa-survey-v1";
const ASSETS=["./","./bespa-survey.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS).catch(()=>{})));});
self.addEventListener("activate",e=>{e.waitUntil(
  caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const cp=res.clone(); caches.open(C).then(c=>c.put(e.request,cp).catch(()=>{})); return res;
  }).catch(()=>caches.match("./bespa-survey.html"))));});