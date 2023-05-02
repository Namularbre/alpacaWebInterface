const pty = require('node-pty');

class AlpacaController {

    static async getResponse(req, res) {
        const question = req.query.question;
        let alpacaProcess = pty.spawn(`C:\\alpaca\\alpaca.cpp\\Release\\web.bat`, [`${question}`], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: '',
            env: process.env
        });

        let response = "";

        if (question.length !== 0) {

            alpacaProcess.onData( (data) => {
                response += data;
            });

            alpacaProcess.onExit(() => {
                response = response.split('repeat_last_')[1];
                response = response.split('[end of text]')[0];

                console.log(response);

                res.send({response : response});
            });
        } else {
            res.status(402);
        }
    }
}

module.exports = AlpacaController;
