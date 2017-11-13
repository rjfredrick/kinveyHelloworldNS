# kinveyHelloworldNS
This is the {N} Helloworld iOS app but Kinvey-ified

## Kinvy instructions
* create a kinvey app
* create a kinvey collection
** Name is Taps
** Add a column to the Taps collection
** Add a row to the Taps collection
** Grant Update to the Taps collection
* add row to collection
* create a user

## App installation instructions
* tns platform add ios
* tns prepare ios
* open platforms/ios/kinveyHelloworldNS.xcworkspace/
* enable Keychain Sharing
* build the project
* configure app.ts with app key and app secret
* tns run ios (device of your choice)
