# Total-Solutions, a Ticket based support system

Robust MEAN Ticket based support system

## Domain pointed to cloud server using route 53

[totalsolutions.ga](http://totalsolutions.ga "Ticket based support app")

## AWS public ip

[54.209.102.122](http://54.209.102.122/ "Ticket based support app")

## Note
```
		All users having first name as admin will be the admin of this application.
```

## Features

		1) Login(encrypted)
		2) Signup(encrypted)
		3) Ticket Raising panel - User facing 
			~ A View to create a ticket.
			~ File upload upto 20 MB.
			~ A View to view all queries raised by the person. This view contains necessary shortcuts like open and close query with sort and filter functionality.
			~ A view to show the details of a particular query.
			~ This view contains file download feature and one can download the files attached by the user.
			~ Nice and beautiful chat like UI.
			~ This view has the option to set the status of the ticket to ‘open’ or ‘closed’ depending on whether the query is resolved or not. 
		4) Ticket Resolution panel - Admin
			~ View to Display ticket by status. This view lists all tickets received by the support system. There are buttons to filter through the status of ticket. Ticket can be of status ‘open’ or ‘closed’ depending on whether the query is resolved or not.
			~ A view to show the details of a particular query.
			~ This view contains file download feature and one can download the files attached by the user.
			~ Nice and beautiful chat like UI.
			~ This view has the option to set the status of the ticket to ‘open’ or ‘closed’ depending on whether the query is resolved or not.
		5) Additional Features
			~ On Status change of ticket, the person should receive an email notification.
			~ When the person receives the answer or the admin receives the reply, an email notification should be sent to the person concerned.
			~ For the sake of simplicity, treat the Admin as a user of the system. Don’t create special backend for admin.

## Extra features

		1) File Upload functionality.
		2) File Download functionality.
		3) Google signup and google login.
		4) Facebook signup and facebook login.
		5) Secure password reset feature with token expiry functionality.	

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

		1) Nodejs
		2) Mongodb
		3) NPM
		4) Git

### Installing

Environment : Windows and Linux

Setting Prerequisites

```
	1) Start mongodb by running mongod
	2) Check node is above version 6.0. Check by typing node -v in terminal
```

Setting up the local server

```
	1) Unzip the file
	2) Open terminal and change its location the where you unzipped the file
	3) Run command npm install
	4) After all dependencies are installed. Run command : node app.js, in your terminal
	5) let the server start
```

Getting started

```
	1) Visit http://localhost:3000 on your browser
	2) Select signup to create a new account
	3) Enhance you customer support functionality with beautiful and user friendly online ticket based support system.
```

## How to use

```
	User facing :
		1) Use a unique email to start with
		2) After logging in, user will be able to view all the tickets he has created.
		3) User can filter tickets based on which are open or closed.
		4) While creating a ticket an user can upload any file upto 20 MB that best describes his query. 
		5) Clicking on a particular ticket will open the query view where user can see all the original question and answer.
		6) Users can download his uploaded file at the time of query creation.
		7) User will be able to reply to messages and send message himself in a chat like beautiful interface.
		8) User can reset password securely if he forgets it.
	Admin facing :
		1) Admin must signup with first name as admin (all small characters).
		2) All users having first name as admin will be the admin of this application.
		3) After logging in, admin will be able to view all the tickets that has been created on the support system.
		4) Admin can filter tickets based on which are open or closed. 
		5) Clicking on a particular ticket will open the query view where admin can see all the original question and answer.
		6) Admin can download the file uploaded by the user at the time of query creation.
		7) Admin will be able to reply to the query in a chat like beautiful interface.
		8) Admin can reset password securely if he forgets it.
```



## Deployment on linux server

Prerequisites

```
	1) Mongodb
	2) Node js version 6 and above
	3) Nginx
	4) Git
```

Installing and pulling files

```
	1) Create new directory by : mkdir dirname
	2) cd into that folder
	3) Add git origin by : git remote add origin https://github.com/codemachin/TotalSolutions.git
	4) Initialise git to that directory : git init
	5) Pull files: git pull origin master  
	6) Run : npm install, to install all dependencies
	7) Run : node app.js, to start the server
```

Nginx configuration for proxy pass to port 80

```

	server {

	    listen 80;
	    server_name totalsolutions.ga;

	    location / {

	            proxy_pass http://localhost:3000;

	    }

	}

```

## Built With

* Bootstrap
* nodejs
* Postman
* Sublime Text

## Versioning

Total Solutions version 1.0

## Authors

* **Vivek Shankar** 