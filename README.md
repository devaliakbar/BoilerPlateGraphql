# BoilerPlateGraphql
Clone this project and delete '.git' file <br/>
Then run this command <br> 
=> prisma init prisma <br/>
=> cd prisma <br/>
Delete "datamodel.prisma" and "prisma.yml" files <br/>
Copy "datamodel.graphql" and "prisma.yml" files from "replace_prisma" folder and paste to prisma folder. then delete "replace_prisma" folder <br/>
If you are using MongoDb, then add this line after "datamodel" in "prisma.yml" file:<br>
'databaseType: document' <br/>
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

## Deploy to server(Digital Ocean)
### Setup Prisma Server
Select a Docker droplet <br>
Upload "docker-compose.yml" file from prisma folder to server. (Uncomment line 12) <br>
scp docker-compose.yml root@{ip}:~
<br>
Connect to ssh, their in root directory, their will be "docker-compose.yml" file.<br>
Then run <br>
=> docker-compose up -d <br>
=> docker ps
<br>
Now your deployment prisma server is running <br>

### Setup Node js Server
First in your prisma project root directory <br>
=> Create a new file called 'prod.env' in config folder and add the following line <br>
```javascript
  PRISMA_MANAGEMENT_API_SECRET=my-secret
```
Here 'my-secret' is the "docker-compose.yml" file , Uncommented line 12 managementApiSecret. <br>
=> Copy contents of 'dev.prod' file except : PRISMA_ENDPOINT=http://{ip}:4466 , to prod.env <br>
=> Now come back to project root directory <br>
=> cd prisma <br>
=> prisma deploy -e ../config/prod.env <br>
Now our Prisma server is updated
<br><br>

#### Now we can deploy node js
<ol>
<li>npm run build-project</li>
<li>copy 'package.json' to dist directory</li>
<li>in 'package.json' file, remove "devDependencies" object and replace "scripts" object with the following </li>
<li><pre>
  "scripts": {
    "start": "node index.js",
  },
<pre> </li>
<li>now compress files in 'dist' directory</li>
<li>upload to server</li>
<li>scp -r Archive.zip root@134.209.148.153:~</li>
<ol>
