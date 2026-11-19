
// * DONE: classe di errore personalizzata con status HTTP e messaggio
class HttpError extends Error {                                             //-> si estende la classe Error
    constructor(status, messaggio) {                                        //-> il costruttore definisce cosa è presente nella classe
        super(messaggio);                                                   //-> chiama il costruttore di Error che imposta message e stack
        this.name = "HttpError";                                            //-> nome dell'errore presente nei log
        this.status = status;                                               //-> status code HTTP
    }
}

// export
module.exports = { HttpError };