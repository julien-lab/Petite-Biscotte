# Petite Biscotte
Realtime javascript app to create and mix music

## Usage
```
npm install
npm run dev

Go to https://localhost:3000 

If you want this app to be served globally, 
download ngrok and inside the ngrok directory make the two following commands :

./ngrok authtoken <your authentification token>

./ngrok http 3001

Go to the https link ngrok will provide you

Browsers block some features of our application regarding the autoplay due to their security policy.
If you want to get rid of them and enjoy the best experience our app can offer you just disable them.
With Chrome you can do it with the following command : 
chrome.exe --autoplay-policy=no-user-gesture-required

You can also want to disable pull-to-refresh gesture via :
chrome://flags/#disable-pull-to-refresh-effect
Then you can enjoy our app in the best conditions.
```
