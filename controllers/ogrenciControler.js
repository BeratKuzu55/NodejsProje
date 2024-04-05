const database = require("../database");
const databaseController = require("./databaseController");
// öğrenci ekleme işlemi
const ogrenciEkle = async function (req , res) {
    const {ogrenciAdi , email} = req.body;

    //console.log(req.body);
    try{
        await database.client.query(`INSERT INTO ogrenci (name, email) VALUES ('${ogrenciAdi}', '${email}')`); 
        //  Veritabanı Güncelleme: sayaç değişkeni, öğrenci eklendikçe ve silindikçe güncellenecektir
        await database.client.query(`UPDATE ogrenci_sayac SET ogrenci_sayac = ogrenci_sayac + 1`);
        //databaseController.mailGonder("selam!!!");
        console.log("selam");
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
    const result =  await database.client.query(`update ogrenci
    set name = '${req.body.name}',
        email = '${req.body.updatedEmail}'
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