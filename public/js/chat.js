class HomeModel {
    async getResponse(question) {
        const url = '/alpaca?' + new URLSearchParams({"question" : question});
        let httpResponse = await fetch(url);

        if (httpResponse.status === 200) {
            httpResponse = await httpResponse.json();
            let response = httpResponse.response;
            response = response.split('[?25h')[1];
            //removing windows CMD special chars
            //response = response.replace(/^a-zA-Z0-9 ]/g, '');
            response = response.replace(/\x1B\[[0-9;]*[mG]/g, '');
            //response = response.replace('[K', '');
            //response = response.replace('\r\n', '');
            return response;
        } else {
            return {data: 'Erreur durant l\'envois de votre question. Veuillez recharger la page.'};
        }
    }
}

class HomeController {
    #model;
    #view;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;
    }

    async init() {
        await this.defineQuestionButton();
        await this.#view.hideLoadingAnimation();
    }

    async defineQuestionButton() {
        let button = document.querySelector("#question-button");

        button.addEventListener('click', async () => {
            const minQuestionLength = 3;
            const questionInput = document.querySelector('#question');
            const question = questionInput.value;

            if (question.length >= minQuestionLength) {
                await this.#view.displayQuestion(question);
                await this.#view.disableQuestionInput();
                const response = await this.#model.getResponse(question);
                await this.#view.displayResponse(response);
            } else {
                alert("wip");
                return;
            }

            await this.#view.enableQuestionInput();

            questionInput.value = "";
        });
    }
}

class HomeView {
    async displayQuestion(questionContent) {
        let chatComponent = document.createElement('v-chat');
        chatComponent.setAttribute('author', 'You');
        chatComponent.setAttribute('text', questionContent);
        chatComponent.setAttribute('background', 'bg-white');

        const chatContainer = document.querySelector('#chat-container');

        chatContainer.appendChild(chatComponent);

        await this.displayLoadingAnimation();
    }

    async displayResponse(response) {
        let chatComponent = document.createElement('v-chat');
        chatComponent.setAttribute('author', 'Alpaca');
        chatComponent.setAttribute('text', response);
        chatComponent.setAttribute('background', 'bg-light');

        const chatContainer = document.querySelector('#chat-container');

        chatContainer.appendChild(chatComponent);

        await this.hideLoadingAnimation();
    }

    async displayLoadingAnimation() {
        let loadingComponent = document.querySelector('v-load');

        loadingComponent.style = "display: block;";
    }

    async hideLoadingAnimation() {
        let loadingComponent = document.querySelector('v-load');

        loadingComponent.style = "display: none;";
    }

    async disableQuestionInput() {
        const questionInput = document.querySelector('#question');
        const questionBtn = document.querySelector('#question-button');

        questionInput.disabled = true;
        questionInput.value = "";
        questionBtn.disabled = true;
    }

    async enableQuestionInput() {
        const questionInput = document.querySelector('#question');
        const questionBtn = document.querySelector('#question-button');

        questionInput.disabled = false;
        questionBtn.disabled = false;
    }
}

const homeModel = new HomeModel();
const homeView = new HomeView();
let homeController = new HomeController(homeModel, homeView);

homeController.init().catch(error => console.error(error.message));
