# Ionic Project - One Stop Click Application
- Technology : Ionic 3.6

## Installation Step
1.	Open CMD or Terminal on your computer.
2.	Navigate to your project folder.
3.	Install Ionic Cordova run this command on terminal `npm install -g cordova ionic`
4.	Run this command on terminal `npm install`.
5.	Go to [Project Folder]/src/config.ts to configure backend address and other static value

## Build Platform
- To build platform on ionic you can run this command on terminal
### ANDROID
`ionic cordova platform add android`
### IOS
`ionic cordova platform add ios`

## Run on Browser
- To run ionic application on browser you can run this command on terminal
`ionic serve -l -c -s`

## Build installer
- To build an installer for each platform on Ionic you can run this command on terminal
### ANDROID
`ionic cordova build android`
### IOS
`ionic cordova build ios`

## Run on Emulator
- To run ionic application on emulator each platform you can run this command on terminal
### ANDROID
`ionic cordova run android --target=[DEVICE_NAME]`
### IOS
`ionic cordova run ios`