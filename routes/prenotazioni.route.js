// import
const { Router } = require("express");
const { creaPrenotazioneController, delPrenotazioneController } = require("../controllers/prenotazioni.controller");

// creazione router
const router = Router();

// rotte sulla quale sono montati i controller
router.post("/", creaPrenotazioneController);
router.delete("/:id", delPrenotazioneController);

// export
module.exports = { routerPrenotazioni: router };