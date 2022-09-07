# Compressify App
This is a project that is written really fast that helped me compress all of my images and videos with just a click, with a couple of compress settings (quality, max output width, etc).

## Use this at your own risk
The code is probably unstable, not battle-tested, actually not tested at all- except just one time when I've used it. I could manage compress around 60 gigs of mixed images & videos into 8 gig (or something), which was enough for me.

I mean you can try to build it and use it, or even you can try use it in dev mode. I cant remember whether it was working on Windows or not, if you can get it working just let me know.


![image](https://i.imgur.com/epN6Lfs.png)

MacOS build
```js
npm uninstall sharp
npm install --platform=darwin --arch-x64 sharp
npm run build:mac
```

Windows build
```js
npm uninstall sharp
npm install --platform=win32 --arch-x64 sharp
npm run build:win64
```
