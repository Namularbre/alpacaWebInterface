const pty = require('node-pty');

class AlpacaController {

    static async getResponse(req, res) {
        const question = req.query.question;
        const minQuestionSize = 3;
        const maxQuestionSize = 10000;

        let alpacaProcess = pty.spawn(`C:\\alpaca\\alpaca.cpp\\Release\\web.bat`, [`${question}`], {
            name: 'xterm-color',
            cols: 10000,
            rows: 0,
            cwd: '',
            env: process.env,
            handleFlowControl: true
        });

        let response = "";
        let responseCreationChunk = "";
        let isLongResponse = false;

        if (question.length >= minQuestionSize && question.length < maxQuestionSize) {
            alpacaProcess.onData( (data) => {
                responseCreationChunk += data;

                if (response.length === 64 ) {
                    isLongResponse = true;
                    response += responseCreationChunk;
                }
            });

            alpacaProcess.onExit(() => {
                if (!isLongResponse) {
                    response = responseCreationChunk;
                }

                response = response.split('repeat_last_')[1];
                response = response.split('[end of text]')[0];
                res.send({response : response});
            });
        } else {
            res.status(402);
        }
    }
}

module.exports = AlpacaController;
