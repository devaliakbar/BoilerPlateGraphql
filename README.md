# BoilerPlateGraphql
Clone this project and delete '.git' file
Then run this command => prisma init prisma
=> cd prisma
Delete "datamodel.prisma" and "prisma.yml" files
Copy "datamodel.graphql" and "prisma.yml" files from "replace_prisma" folder and paste to prisma folder. then delete "replace_prisma" file
If you are using MongoDb, then add this line after "datamodel" in "prisma.yml" file:  'databaseType: document'
