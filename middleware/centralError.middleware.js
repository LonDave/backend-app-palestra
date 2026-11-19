// import
const { HttpError } = require("../lib/http.error");

// middleware personalizzato per il catch all degli errori nel server.js
const httpErrorMiddleware = (err, req, res, next) => {

    if (err instanceof HttpError) {                                         //-> se err fa parte della classe
        return res.status(err.status).json({ errore: err.message });        //-> errori previsti
    };
    console.log(err);
    res.status(500).json({ errore: "Errore interno del server" });          //-> errori imprevisti
};

// export
module.exports = {
    httpErrorMiddleware
}