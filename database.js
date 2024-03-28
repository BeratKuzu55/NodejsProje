const pg = require('pg');
const env_variables = require("dotenv");

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'NodejsProjeDB',
    password: env_variables.config().parsed.DATABASE_PASSWORD,
    port: 5432, // PostgreSQL varsayılan portu
});

const a = 5;
const connectDB = async function(){
    await client.connect((err) => {
        if(!err) {
            console.log("bağlantı başarılı");
        }
        else {
            console.log(err);
        }
    });
} 

const createDatabase = () => {
    client.query(`CREATE TABLE IF NOT EXISTS "ogrenci" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) UNIQUE NOT NULL,
        "deptid" INTEGER,
        "counter" INTEGER
    )`);

    client.query(`CREATE TABLE IF NOT EXISTS "ogrenciBolum" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INTEGER REFERENCES "ogrenci"("id"),
        "dept_id" INTEGER
    )`);

    client.query(`CREATE TABLE IF NOT EXISTS "bolum" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "dept_std_id" INTEGER
    )`);

}


module.exports = {
    a,
    client , 
    connectDB , 
    createDatabase ,
}