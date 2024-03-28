const express = require("express");
const ogrenciController = require("../controllers/ogrenciControler");
const router = express.Router();

router.route("/ekle").post(ogrenciController.ogrenciEkle); // /ogrenci/ekle
router.route("/sil").delete(ogrenciController.ogrenciSil); // /ogrenci/sil
router.route("/guncelle").post(ogrenciController.ogrenciGuncelle);

module.exports = router;

