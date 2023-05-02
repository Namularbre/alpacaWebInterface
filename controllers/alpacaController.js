const pty = require('node-pty');

class AlpacaController {
    static #processAlreadyRunning = false;

    static async getResponse(req, res) {
        const apologiesPhrase = "Désolé, je suis très occupé à répondre au question d'une autre personne. Pouvez-vous patienter un peu ?";
        if (AlpacaController.#processAlreadyRunning) {
            res.status(200).send({response : apologiesPhrase});
            return;
        }

        const question = req.query.question;
        let alpacaProcess = pty.spawn(`C:\\alpaca\\alpaca.cpp\\Release\\web.bat`, [`${question}`], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: '',
            env: process.env
        });

        AlpacaController.#processAlreadyRunning = true;

        let response = "";

        if (question.length !== 0) {

            alpacaProcess.onData( (data) => {
                response += data;
            });

            alpacaProcess.onExit(() => {
                response = response.split('repeat_last_')[1];
                response = response.split('[end of text]')[0];

                AlpacaController.#processAlreadyRunning = false;
                res.send({response : response});
            });
        } else {
            res.status(402);
        }
    }
}

module.exports = AlpacaController;
