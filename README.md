# eChallan
Hand held device application for traffic police
App allows the user to get violenter details through vehicle number. App can generate or view previous challans for respective violations and do the payment or seize the vehicle or documents while not able to pay.

## Getting Started
To begin using this application, choose one of the following options to get started:

Clone the repo: git clone https://github.com/NxtLife-Products/eChallan.git (After getting the rights)
Fork the repo

## Project Structure

```
.
 ├── resources                    # Build files on the specific platforms (iOS, Android) and app icon + splash
 ├── src                          # This is where the app lives - *the main folder*
 ├── .editorconfig                # A helper file to define and maintain coding styles across environments
 ├── .gitignore                   # Specifies intentionally untracked files to ignore when using Git
 ├── .io-config.json              # Ionic ID
 ├── config.xml                   # Ionic config file
 ├── .ionic.config.json           # Global configuration for your Ionic app
 ├── package.json                 # Dependencies and build scripts
 ├── readme.md                    # Project description
 ├── tsconfig.json                # TypeScript configurations
 └── tslint.json                  # TypeScript linting options
```

### src directory
```
.
   ├── ...
   ├── src                       
   │   ├── app                    # This folder contains global modules and styling
   │   ├── assets                 # This folder contains images and the *data.json*
   |   ├── pages                  # Contains all the individual pages (about,contact,home,payment-gateway,print-receipt,    |   |                            seize, seize-modal, tabs, uploaded-challan, view-challan, violenter-history)
   |   ├── components             # Contains all the individual pages (add-violation, generate-challan, login, profile,     |   |                            vehicle-detail)
   |   ├── providers              # Contains the custom api service that is used in all respective provider to get, post,   |   |                            put, delete data from the database
   |   ├── theme                  # The global SCSS variables to use throughout the app
   |   ├── declarations.d.ts      # A config file to make TypeScript objects available in intellisense
   |   ├── index.html             # The root index app file - This launches the app
   |   ├── manifest.json          # Metadata for the app
   │   └── service-worker.js      # Cache configurations
   └── ...
```


## Start the project
The project is started with the regular ionic commands.

1. Run `npm install` to install all dependencies.
2. Run `ionic serve` to start the development environment.
3. To build the project run `ionic build android` or `ionic build ios`. In order for you to build an iOS app, you need to run on MacOS.

## Bugs and Issues

## Creator

The app was created by and is maintained by **[NxtLife Technologies Ltd](http://www.nxtlifetechnologies.com)**

## Copyright

Copyright 2018 NxtLife Technologies Ltd(http://www.nxtlifetechnologies.com).
