// import
const { Router } = require("express");
const { tuttiCorsiController, corsoByIdController, creaCorsoController, delCorsoController } = require("../controllers/corsi.controller");

const router = Router();                                                     //-> creazione router    

// rotte sulla quale sono montati i controller
router.get("/", tuttiCorsiController);
router.get("/:id", corsoByIdController);
router.post("/", creaCorsoController);
router.delete("/:id", delCorsoController);

// export
module.exports = { routerCorsi: router };