const database = require("../database");
const moment = require("moment");
const databaseController = require("./databaseController");
// öğrenci ekleme işlemi
const ogrenciEkle = async function (req , res) {
    const {ogrenciAdi , email} = req.body;
    console.log(req.body);
    const create_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(await databaseController.ogrenciListesiGetir());
    try{
        //console.log(typeof Date.parse(moment().format('MMMM Do YYYY, h:mm:ss a')));
        console.log(create_date);
        await database.client.query(`INSERT INTO ogrenci (name, email , created_at) VALUES ('${ogrenciAdi}', '${email}' , '${create_date}')`); 
        //  Veritabanı Güncelleme: sayaç değişkeni, öğrenci eklendikçe ve silindikçe güncellenecektir
        await database.client.query(`UPDATE ogrenci_sayac SET ogrenci_sayac = ogrenci_sayac + 1`);
        //databaseController.mailGonder("selam!!!");
        res.status(201).json({
            status : "success", 
        });
    }
    catch (err) {
        console.log(err);
    }

}

// email bilgisine göre öğrenci silme işlemi
const ogrenciSil = async function (req , res) {
    let kontrol = false;

    try {
        const result = await database.client.query(`delete from ogrenci where email='${req.body.email}'`);
        //Veritabanı Güncelleme: sayaç değişkeni, öğrenci eklendikçe ve silindikçe güncellenecektir
        await database.client.query(`UPDATE ogrenci_sayac SET ogrenci_sayac = ogrenci_sayac - 1`);
        //console.log(result);
        // belirtilen emaile sahip olan bir öğrenci kaydı var mı yok mu ? 
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

const ogrenciGuncelle = async function(req , res){

    const update_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(update_date);
    const result =  await database.client.query(`update ogrenci set name = '${req.body.name}',
        email = '${req.body.updatedEmail}' , 
        updated_at = '${update_date}' 
    where email = '${req.body.email}'`);

    console.log(result);
    res.status(201).json({
        status : "updating is success"
    })
}

module.exports = {
    ogrenciEkle , 
    ogrenciSil ,
    ogrenciGuncelle  ,
}