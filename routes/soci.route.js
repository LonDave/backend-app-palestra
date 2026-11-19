// import
const { Router } = require("express");
const { trovaSociController } = require("../controllers/soci.controller");

const router = Router();                                                     //-> creazione router    

// rotte sulla quale sono montati i controller
router.get("/", trovaSociController);

// export
module.exports = { routerSoci: router };