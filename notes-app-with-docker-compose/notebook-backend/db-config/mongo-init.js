const notebookDbUser = process.env.NOTEBOOK_DB_USER
const notebookDbPassword = process.env.NOTEBOOK_DB_PASSWORD
const notebookDbName = process.env.NOTEBOOK_DB_NAME


console.log ("Initializing : Notebook DB User")
db = db.getSiblingDB(notebookDbName);

db.createUser ({
    user: notebookDbUser,
    pwd: notebookDbPassword,
    roles : [
        { 
            role: 'readWrite',
            db: notebookDbName,
        },
    ],
});