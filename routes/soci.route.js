// import
const { Router } = require("express");
const { trovaSociController } = require("../controllers/soci.controller");

const router = Router();                                                     //-> creazione router    

// 
router.get("/", trovaSociController);

// export
module.exports = { routerSoci: router };