# kinveyHelloworldNS
This is the Kinvey-ified {N} Helloworld iOS app

## Kinvy instructions
* create a kinvey app
* create a 'Taps' collection
  * Add a 'counter' column to the Taps collection
  * Add a row to the Taps collection
  * Grant Update to the Taps collection
* add row to collection
* create a 'demo/demo' user
  * Or create a new user and modify main-view-model.ts

## App installation instructions
* tns platform add ios
* tns prepare ios
* open platforms/ios/kinveyHelloworldNS.xcworkspace/
* enable Keychain Sharing
* build the project
* configure app.ts with app key and app secret
* tns run ios (device of your choice)
