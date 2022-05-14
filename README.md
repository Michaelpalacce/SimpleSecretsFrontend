# Simple Secrets Frontend

## DEPRECATED ( moved to the API for tighter security )

A simple SPA PWA web app. Runs on port 3000.

When the app starts at the top you will be able to specify the URL to the simple secrets api, change it according to your distribution.

This is pretty much a static webpage that is being served, no persistent storage is needed. The url to be used will be stored in the local storage of the web browser.

## API backend:
https://github.com/Michaelpalacce/SimpleSecrets

## Env Variables

| Variable | Description                                         | Default                         |
|----------|-----------------------------------------------------|---------------------------------|
| APP_PORT | The Port on which the app will run                  | 3000                            |
| API_URL  | The kubernetes DNS record for the simplesecrets api | simplesecrets-api.simplesecrets |


## Screenshots
Home page:
<img src="resources/example-1.png" alt="">

Adding a new secret:
<img src="resources/example-2.png" alt="">

Updating an existing secret:
<img src="resources/example-3.png" alt="">

Mobile view:
<img src="resources/example-4.png" alt="">

## Docker image:
https://github.com/Michaelpalacce/SimpleSecretsFrontend

