// import
const { z } = require("zod");
const { AppDataSource } = require("../config/typeorm.conf");

// schema zod
const CorsiSchema = z.object({
    name: z.string().trim().min(1, "Inserire un nome").max(125),
    istruttore: z.string().trim().min(1, "Inserire un istruttore").max(125),
    livello: z.enum(["base", "intermedio", "avanzato"]),
    posti: z.number().int().positive()
});

/* 
    serve una funzione per evitare di eseguirlo quando il modulo viene caricato siccome "initialize()"
    in quel momento non è stato ancora eseguito ed andrebbe in errore
*/
const repoCorsi = () => AppDataSource.getRepository("Corso");

// * DONE: tutti i corsi
const trovaCorsi = async (filtri = {}) => {
    return repoCorsi().find({where: filtri});
};

module.exports = {
    CorsiSchema,
    trovaCorsi,
    creaCorso,
    trovaCorsoById,
    eliminaCorso
}