const express = require("express");
const bolumController = require("../controllers/bolumController");
const router = express.Router();

router.route("/ekle").post(bolumController.bolumEkle); // /bolum/ekle
router.route("/sil").delete(bolumController.bolumSil); // /bolum/sil
router.route("/guncelle").post(bolumController.bolumGuncelle); 

module.exports = router;

