> :warning: **The app is currently migrating to the React Hooks API therefore the source code is not in it's final form**


# Noter

### Noter is a *mobile first* open-source notetaking app made with:

* [NodeJS](https://github.com/nodejs/node)/[Express](https://github.com/expressjs/express)
* [React JS](https://github.com/facebook/react)
* [Styled Compnents](https://github.com/styled-components/styled-components)
* MongoDB/[Mongoose](https://github.com/Automattic/mongoose)

The goal of the project is to create guidelines for a production ready SPA created with the stack mentioned above.

# [Demo(desktop UI is experemental!)](http://note-r.herokuapp.com)


### Demo account:
login | password |
| -- | -- |
| test | testPass  | 

# Development
Clone or download the repo 
`git clone https://github.com/tbl4ero/noter.git`

Install all the dependencies
`npm install`


Setup enviromental variables in `.env`
```
PRODUCTION=false
DB_ADDRESS=<YOUR_MONGOBD_DATABASE_ADDRESS>
```

Start the dev server
`npm run dev`

# Buliding for production
Get the bundled version by running 
`npm run build`

Set the `.env` production variable
```
PRODUCTION=true // false by default
```

Starting production server:
`npm run prod`

# Contributing
##### The app is currentlly migrating to React Hooks API, feel free to contribute into that and also feel free to send pull requests with any of your ideas/improvements!


