const database = require('../database');

const veritabaniGuncelle = async function (req , res) {

}

const haftalikRaporVer = async function (req , res) {
    ogrenciListesiGetir();
}

const ogrenciListesiGetir = async function () {
    try {
        const result =  await database.client.query(`select * from ogrenci`);
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    veritabaniGuncelle , 
    haftalikRaporVer , 
}