/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "6bc66ecd0c6ebe75d79a3a725db423e3"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6bc66ecd0c6ebe75d79a3a725db423e3"
  }, {
    "url": "pwa-192x192.png",
    "revision": "3f9f64d8c2e0e14e764032238673cb4b"
  }, {
    "url": "index.html",
    "revision": "9227e7f66e40596e04e6383d3c830156"
  }, {
    "url": "icon.svg",
    "revision": "9076e3204f03e68fec77e88fb75502c5"
  }, {
    "url": "favicon.ico",
    "revision": "fa998cf72afd460d597945c5bcb8b91a"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "3752947f3d1e262aa06574b3bc080ab9"
  }, {
    "url": "assets/index-DbWC6CSP.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "3752947f3d1e262aa06574b3bc080ab9"
  }, {
    "url": "favicon.ico",
    "revision": "fa998cf72afd460d597945c5bcb8b91a"
  }, {
    "url": "icon.svg",
    "revision": "9076e3204f03e68fec77e88fb75502c5"
  }, {
    "url": "pwa-192x192.png",
    "revision": "3f9f64d8c2e0e14e764032238673cb4b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "6bc66ecd0c6ebe75d79a3a725db423e3"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "6bc66ecd0c6ebe75d79a3a725db423e3"
  }, {
    "url": "manifest.webmanifest",
    "revision": "655254a0ee003fcfbca36a1e1e8170ac"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/cdnjs\.cloudflare\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "cdn-libs-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 5184000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
