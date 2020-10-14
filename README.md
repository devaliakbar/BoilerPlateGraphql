# BoilerPlateGraphql
Clone this project and delete '.git' file <br/>
Then run this command <br> 
=> prisma init prisma <br/>
=> cd prisma <br/>
Delete "datamodel.prisma" and "prisma.yml" files <br/>
Copy "datamodel.graphql" and "prisma.yml" files from "replace_prisma" folder and paste to prisma folder. then delete "replace_prisma" folder <br/>
If you are using MongoDb, then add this line after "datamodel" in "prisma.yml" file:  'databaseType: document' <br/>
<br>
From 'prisma' directory run the following comment <br>
=> docker-compose up -d <br>
=> prisma deploy -e ../config/dev.env <br>
Now go to 'http://localhost:4466', there you can see prisma playground <br>
Now in terminal, go to project root directory (cd ..) <br>
now run <br>
=> npm init <br>
=> npm i @babel/polyfill babel-cli babel-plugin-transform-object-rest-spread babel-preset-env bcryptjs env-cmd graphql-yoga jsonwebtoken prisma-binding <br>
=> npm i nodemon --save-dev <br>
=> Now Replace "package.json" file "scripts" object with the following <br>
```javascript
  "scripts": {
    "start": "node dist/index.js",
    "build-project": "babel src --out-dir dist --copy-files",
    "dev": "env-cmd -f ./config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
Now Run the project by the following command <br>
=> npm run dev <br>
Go to "http://localhost:4000" 

## Deploy to server
