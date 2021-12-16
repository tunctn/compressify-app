Windows build
npm uninstall sharp
npm install --platform=win32 --arch-x64 sharp
npm run build:win64

MacOS build
npm uninstall sharp
npm install --platform=darwin --arch-x64 sharp
npm run build:mac
