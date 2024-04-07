const moment = require("moment");
const database = require("../database");

const bolumEkle = async function (req , res) {

    const createDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    console.log(req.body);
    try{
        await database.client.query(`INSERT INTO bolum (name , dept_std_id , created_at) VALUES 
        ('${req.body.bolumadi}' , ${req.body.deptStudentId} , '${createDate}')`);   
        res.status(201).json({
            status : "success", 
        });
    }
    catch (err) {
        console.log(err);
    }
}

const bolumSil = async function (req , res) {
    try {
        const result = await database.client.query(`delete from ogrenci where name='${req.body.bolumadi}'`);
        
        //console.log(result);
        if(result.rowCount != 0){
            res.status(201).json({
                status : "deleteing result is success"
            });
        }
        else {
            res.status(201).json({
                status : "there is not a student has these informations"
            });
        }
    }catch (err){
        console.log(err);
    }
}

const bolumGuncelle = async function (req , res) {

    const updateDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    const result =  await database.client.query(`update bolum
    set name = '${req.body.updatedBolumName}' , 
    updated_at = '${updateDate}'
    where name = '${req.body.bolumadi}'`);

    console.log(result);
    res.status(201).json({
        status : "updating is success"
    })
}

module.exports = {
    bolumEkle , 
    bolumSil , 
    bolumGuncelle ,
}