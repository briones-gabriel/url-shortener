# url-shortener

A URL shortening service so that users can make custom URLs to their long URLs.

## Requirements

To run the project you will only need Node.js or Yarn installed in your environement, and a MongoDB Atlas account where to store the data.

### Node installation
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### MongoDB configuration
  Finally, you will need to configure the MongoDB Atlas connection.

      $ cd url-shortener/app.js
      $ Go to line 15
      $ Edit the MongoDB Atlas credentials with your <username>, <password> and <dbname> 
      
## Install

    $ git clone https://github.com/briones-gabriel/url-shortener
    $ cd url-shortener
    $ npm install

## Running the project

    $ npm run start
