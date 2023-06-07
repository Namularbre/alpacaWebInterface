const pty = require('node-pty');

class AlpacaModel {
    static alpacaProcess = null;
    static alpacaContext = "(You are an IA here to answer question people ask to you. You are here to help as much as you can.) Here is your question : ";

    static async launchAlpaca(question) {
        if (AlpacaModel.alpacaProcess)
            return;

        try {
            AlpacaModel.alpacaProcess = pty.spawn(`C:\\alpaca\\alpaca.cpp\\Release\\web.bat`, [`${AlpacaModel.alpacaContext} ${question}`], {
                name: 'xterm-color',
                cols: 10000,
                rows: 0,
                cwd: '',
                env: process.env,
                handleFlowControl: true
            });
        } catch (error) {
            throw new Error('Error while launching alpaca : ' + error.message);
        }
    }

    static async readAlpacaResponse(question) {
        const minQuestionSize = 3;
        const maxQuestionSize = 10000;

        let response = "";
        let responseCreationChunk = "";
        let isLongResponse = false;

        if (question.length >= minQuestionSize && question.length < maxQuestionSize) {
            await new Promise((resolve) => {
                AlpacaModel.alpacaProcess.onData((data) => {
                    responseCreationChunk += data;

                    if (response.length === 64) {
                        isLongResponse = true;
                        response += responseCreationChunk;
                    }
                });

                AlpacaModel.alpacaProcess.onExit(() => {
                    if (!isLongResponse) {
                        response = responseCreationChunk;
                    }
                    const responseStart = 'repeat_last_';
                    const responseEnd = '[end of text]';

                    response = response.split(responseStart)[1];
                    response = response.split(responseEnd)[0];

                    resolve();
                });
            });
        } else {
            return null;
        }

        return { response: response };
    }

}

module.exports = AlpacaModel;