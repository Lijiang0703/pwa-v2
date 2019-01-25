var cacheStorageKey = 'minimal-pwa-10'
var Version = '1.0'
var preCacheList = [
    '/',
    'index.html',
    'manifest.json',
    'https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3846895839,2711067435&fm=27&gp=0.jpg',
    'https://cdn.staticfile.org/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0'
]
var origin = location.origin;
var cacheV2List = [
    '/api/topics/hot.json',
    '/api/topics/latest.json'
]

var cacheList = [
    '/bundle.js'
]


self.addEventListener('install',e=>{
    console.log("install...")
    self.skipWaiting()
    e.waitUntil(
        caches.open(cacheStorageKey)
        .then(cache=> cache.addAll(preCacheList))
        .then(()=> self.skipWaiting())  //再页面更新过程中，新的sw脚本能立即激活，否则需要关闭页面重新打开
    )
})

self.addEventListener('fetch',(event)=>{ //监听fetch请求，是否启用本地缓存
    console.log("fetching...")
    if(preCacheList.indexOf(event.request.url)!==-1){ //缓存优先
        //precache
        event.respondWith(
            caches.match(event.request).then(response=>{ 
                if(response!=null){
                    return response
                }
                throw new Error('error')   
            }).catch((e)=>{
                //本地未获取到，则从线上获取
                return fetch(event.request.url).then(res=>{
                    return caches.open(cacheStorageKey).then(cache=> {
                        cache.put(event.request,res.clone())  //res只能用一次，需要通过clone使用多次
                        return res
                    })
                }).catch((e)=>{
                    //未获取到数据
                    console.log("fetch error")
                    throw e
                })
            })
        )
    }
    else { //网络优先
        var options = {}
        if(event.request.method.toLocaleLowerCase() === 'post'){
            event.respondWith(
                fetch(event.request)
            )
        }
        else event.respondWith(
            fetch(event.request.url,options).then(res=>{ 
                if(event.request.method !== 'GET') { //只缓存get请求
                    return res;
                }
                return caches.open(cacheStorageKey).then(cache=>{
                    const url = event.request.url.replace(origin,'')
                    if(cacheV2List.indexOf(url)!== -1 || cacheList.indexOf(url)!==-1)
                        cache.put(event.request,res.clone())  //res只能用一次，需要通过clone使用多次
                    return res
                }).catch(e=>{
                    throw e
                })
            }).catch(e=>{
                //未获取到，则从本地获取
                return caches.match(event.request).then(response=>{
                    if(response!=null){
                        return response
                    }
                    throw new Error('error')
                }).catch(e=>{
                    throw e
                })
            })
        )
    }
})

self.addEventListener('activate',(e)=>{
    console.log("activate...")
    e.waitUntil(
        caches.keys().then(res=>{
            return res.map(item=>{
                if(item!== cacheStorageKey){
                    caches.delete(item)
                }
                return item;
            }).filter(item=>{
                item === cacheStorageKey
            })
        })
        .then(()=>{
            return self.clients.claim()  //新的sw取得页面的控制权
        })
    )
})

self.addEventListener('error', event=>{
    // 上报错误信息
    event.waitUntil(
        self.clients.matchAll().then(function(clientLists){  //self.clients获取页面的句柄
            clientLists.forEach((clientlist)=>{
                clientlist.postMessage({
                    client: event.source,
                    message: event.data
                })
            })
        })
    )
})

self.addEventListener('unhandledrejection',event=>{
    // 上报错误信息
    console.log(event.reason)
})

self.addEventListener('message',(event)=>{
    console.log(event.data)
})

self.addEventListener('push',function(event){
    //接受到推送消息
    console.log("get push")
    const title = 'Push Notification ';
    const data = event && event.data && event.data.text()
    const options = {
        body: data || 'Yay it works.',
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };
    
    event.waitUntil( //会保持服务工作线程处于活动状态并运行，直到传入的promise已解析
        self.registration.showNotification(title,options)
    )
})

self.addEventListener('notificationclick',(event)=>{ //用户点击通知
    event.notification.close(); //关闭通知
    event.waitUntil(
        clients.openWindow("https://www.google.com") //确保浏览器不会在打开新窗口前中止服务工作进程
    )
})