# Alpaca web interface

Alpaca is an AI chat bot, that can answer some question.
It has some advantages, like running on a computer or respect your privacy.

<h2>Requirement</h2>

You need Alpaca installed. The interface is made for this application : https://github.com/antimatter15/alpaca.cpp

I never tested other version.

<h2>Installation</h2>

In the Release folder, where you find the chat.exe file, 
add a script file like this if you are on windows, named "web.bat" :

````
cd [direct path to the Alpaca folder]
.\Release\chat.exe -p %1%
````

This file will be executed by the web application.

<i>Note : A linux version is coming, because I need to install this on a server.</i>

After, you will need Node js, at least the version 18.16.0.

In the folder where you have put the code, run 
````
npm i
```` 
It will install dependencies.

You also need to create a ".env" file in the project folder, and fill it like this :
````
HOST=127.0.0.1 //Your host
PORT=3000 //Port of your app
````

To launch the application, type 
````
node server.js
````

And... that's all. You will notice that the application is in French.
I will change that later, I'm planning to work on the frontend part a lot.

<h2>TODO</h2>
- Conversation save (read only)
- Make the view more responsive

<i>Note, I will put them in the footer of the page, so you will have to do nothing.</i>

