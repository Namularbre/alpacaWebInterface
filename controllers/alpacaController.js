const os = require('os');
const pty = require('node-pty');

const AlpacaModel = require('../models/alpacaModel');

class AlpacaController {

    static async getResponse(req, res) {
        const question = req.query.question;

        await AlpacaModel.launchAlpaca(question);
        const response = await AlpacaModel.readAlpacaResponse(question);

        if (response !== null) {
            res.send(response);
        } else {
            res.status(402)
        }
    }
}

module.exports = AlpacaController;
