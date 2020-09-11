eBooks-api

- to start the server 'npm start' on the terminal
- the server run on the port 8080, the port is in the '.env'

- 'npm install' to install all the dependecies

- to init the config, models,migrations, seeders with sequelize : 'npx sequelize init'
- change the name, the password etc... of the config

- to create a database : 'npx sequelize db:create'

- to create a model (exemple) :
  Users: npx sequelize-cli model:generate --name Users --attributes firstName:string,lastName:string,email:string,password:string,birthday:date,phoneNumber:integer

  BOOKS : npx sequelize-cli model:generate --name Books --attributes ISBN:string,title:string,summary:string,author:string,publicationDate:date,pagesNumber:integer,language:string,photo:string

- to migrate the models into the db : 'npx sequelize db:migrate'

- to see the error oh migrating db : 'npx sequelize-cli db:migrate --debug'
