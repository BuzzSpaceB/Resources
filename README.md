# Resources
Functionality used to upload and manage resources like media (e.g. images, video, . . . ) and documents (e.g. PDF documents, Open Document Format documents, etc). These resources can be either embedded or linked to in posts.

This Git Repository will be used to collaborate on the Buzz Space mini project.

Our buzz space name is: D3  -  discuss , debate & deliberate ....

## Project time-line
- **22 March 11:59PM**: __Core functionality of module complete so integration for demo can begin__ 
- **27 March**: Mid-Implementation Demo
- **TBA probably in middle of the holiday**: Module complete & final integration
- **17 April**: Post-Implementation Demo
- **17 April**: Testing phase teams allocated
- **24 April**: Final Demo

## What happens now ? 
1. Read this document thoroughly
2. In your groups identify core functionality for your module 
2. Implement & TEST said core functionality before 22 March 11:59PM (23:59)
3. Implement & TEST the rest of the functionality 
4. Be done with the mini project and let integration team worry about integrating your excellent work :) 

## General remarks
- ###Independence of node packages/modules:  
Please remember that the module you as a team need to deliver needs to be able to run on its own regardless of the user interface in front and/or behind it. 
e.g. Threads should not explicitly output to a html file everything should for example send and receive JSON which could be inserted into any page or file. 
The interface needs to be completely separate from the business logic. 

- ### Testing & web:
Every module needs to have multiple unit tests to ensure that it works correctly. The unit tests will provide the module you are writing with "dummy data".
Your module should/will not run a nodeJS web server(except if you want to test it this way), that is what the integration team will do.

- ###Use of external libraries: 
You may and should use as many libraries as possible to increase code re-use and minimise errors / problems.

### Coding Standard
Please follow Google coding standards throughout the implementation of this project.
- JavaScript Standards: https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
- HTML and CSS Standards: http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml

We will be using http://usejsdoc.org/about-getting-started.html to generate documentation for our project. 
So remember to document your code.


### **Version Control** - git and npm
Both GitHub and npm will be used to collaborate and perform version control of this project. 
For more details see the Master Specification document on the CS website. 
You do not have to add your module to NPM or any repository other than GitHub, as NPM call pull directly from GitHub. 

We ask that you periodically or after reaching some milestone publish a release (with incrementing version number e.g the first release will be v0.0.1 the second v0.0.2 and so on) 
see https://help.github.com/articles/creating-releases/ for more information.

We would like everyone to use the flowing template for the package.json file (modify as needed & enter relevant details)
```
{
  "private": true,
  "main": "mainFileName.js",
  "name": "ModuleName",
  "description": "Module description",
  "version": "0.0.1",
  "repository": {
    "type": "git",
    "url": "https://github.com/BuzzSpaceB/Module"
  },
  "bugs": {
    "url": "https://github.com/BuzzSpaceB/Module/issues"
  },
  "homepage": "https://github.com/BuzzSpaceB/Module",
  "contributors": [
    {
      "name": "Group Member One",
      "email": "group@member.com"
    },
    {
      "name": "Group Member Two",
      "email": "email@group.com"
    },
    {
      "name": "Group member n",
      "email": "n@email.com"
    }
  ],
  "dependencies": {
      "body-parser": "~1.12.0",
      "broadway": "^0.3.6",
      "cookie-parser": "~1.3.4",
      "debug": "~2.1.1",
      "ejs": "~2.3.1",
      "electrolyte": "0.0.6",
      "express": "~4.12.2",
      "handlebars": "^3.0.0",
      "jsreport": "^0.2.10",
      "ldapjs": "^0.7.1",
      "mongoose": "^3.8.25",
      "morgan": "~1.5.1",
      "node-aop": "^0.1.0",
      "node-cache": "^1.1.0",
      "nodemailer": "^1.3.2",
      "react": "^0.13.1",
      "react-bootstrap": "^0.17.0",
      "scribe-js": "^2.0.4",
      "serve-favicon": "~2.2.0"
    }
}

```

## Technologies we will use
### **IDE** - WebStorm (version 9)

You have complete freedom over which IDE you want to use. 
We do however strongly recommend that everyone uses WebStorm 9. 
We recommend this because it integrates very well with all the technologies we will be using. 
You can get WebStorm here: https://www.jetbrains.com/webstorm/download . 
To get a license key register with your Tuks email account here  https://www.jetbrains.com/estore/students/


### **Execution Environment** - Node.js (version 0.12.0)
NodeJS will be used as an execution environment. 
To get a better idea of what NodeJS is and how it works, watch this video: https://www.youtube.com/watch?v=pU9Q6oiQNd0

### **HTTP Server** - Express
Your module will not run a web server, that is what the integration team will manage and run. 
You need to make sure your code can be "plugged" into the greater web server package. 
But for the sake of completeness our website will run on an HTTP server, and we will be using the Express package for NodeJS to achieve this.
The above mentioned video also contains information on this.
But please remember your code needs to be independent from the web server.

### **Database** - MongoDB
We will be using MongoDB as a database. 
MongoDB is a document database and doesn't make use of relational tables such as SQL. 
Documents are inserted into the database (like a file system) and each of these documents (like a Thread object, or an image) are indexed so they can be retrieved later.

### **Database Schema** - Mongoose
Mongoose is a package for NodeJS that wraps around the normal NodeJS MongoDB driver. 
Mongoose allows us to create a schema for our database, which will validate the documents being inserted into the database. 
This includes simple things like making sure a new thread being inserted contains all of the right fields, 
and that these fields are of the right data type. More can be read here: http://mongoosejs.com/

### **Dependency Injection** - ElectroLyte __NB NB NB NB __
Firstly you might ask, what is dependency injection, and why should it be used? 
Please have a look here: http://www.jamesshore.com/Blog/Dependency-Injection-Demystified.html. 
It is an old article, but it explains it well. 

To make our lives easier, we will use ElectroLyte to handle dependency injection. Read about it here:
https://github.com/jaredhanson/electrolyte

Everyone should be using this, in every module. 

### **Aspect Oriented Programming** - node-aop
Within the Buzz System many requests will have to be intercepted. 
For example, if a user clicks on a button to submit a post, 
that request has to be intercepted to first check if the user is authorized to make this post. 
In this case an AuthorizationInterceptor will be used. 
But how will we achieve this? The answer is Aspect Oriented Programming. 
It allows you to intercept function calls. 

We will be using node-aop as a NodeJS package to achieve this: https://www.npmjs.com/package/node-aop

The integration teams will mostly deal with this. 

### **Modular design** - Broadway
Each team will be working on a module of the system, and each of these modules will have to integrate with each other. 
For this we will be using the Broadway plug-in framework. 
This should be of interest to the middle and top level integration teams, 
but lower level teams need to make sure Broadway is compatible with what they did. 

More can be read about it here: https://github.com/flatiron/broadway

### **Templates** - HandleBars
Some modules require a or part of a web front end. 
All of these front end parts will have to integrate in to one web GUI (by the integration team). 
This is a difficult task, and  we'll be using templates so that styling and layout is kept consistent and pluggable. 
We will be using handlebars for this. Read more here: http://handlebarsjs.com/

Remember that the module that you are writing should not for example explicitly output to a web page. 
The module you are coding needs to be able to function without the web front end if need be. 
The web front end is a way of making use of the module. 
For example a "getThread(x111)" function call should instead of sending HTML send JSON which can be inserted into any 
access channel. 

More info on how this will be communicated to you, in due time.

### **UI performance** - reactJs
ReactJS automatically updates the user interface when certain data changes, without reloading the whole page. 
So this can for example be used while a page is open that is showing threads. 
As threads are being posted, the user won't have to refresh, the threads will appear on the page as they come in. 
Have a look here: http://facebook.github.io/react/docs/why-react.html

### **Internationalization** -  i18n-2 framework
The system should support all of the official languages of the University of Pretoria. 
This framework will basically translate the website depending on which language the user's browser is set to. 
More can be read about it here (including examples): https://github.com/jeresig/i18n-node-2

Make sure your modules can integrate with this. But focus on this later, 
getting a working English version is more important at this stage.

### **Caching** - node-cache
Many documents used throughout the system will no change very often. 
These documents can be cached to improve performance. 
For this we will be using a nodeJS package called node-cache. 
More can be read about it here: https://github.com/ptarjan/node-cache

### **CS LDAP Integration** - ldapJS
The Buzz System will have to get user information from the CS LDAP server, like user roles and email addresses. 
This will be done using the ldapJS framework, which is used in conjunction with NodeJS. More info here: http://ldapjs.org/

### **Email Notifications** - NodeMailer
Users can get notified of certain things like threads they subscribe to. 
To do this we will use the NodeMailer JavaScript email client in NodeJS. 
More information here: https://github.com/andris9/Nodemailer

### **Logging** - Scribe.js
Certain activities happening within the system will have to be logged. 
For this we will use Scribe.js, in conjunction with node-aop. 
Node-aop intercepts whatever needs to be logged, and scribe does the logging. 
More info here: https://github.com/bluejamesbond/Scribe.js/tree/master

### **Reporting** - jsreport
Various reports will have to be created in the Buzz System, like reports for user activity etc. 
This CAN be done with the assistance of the jsreport reporting framework. 
This, as most of the other technologies we're using, runs in NodeJS. Read more here: http://jsreport.net/
