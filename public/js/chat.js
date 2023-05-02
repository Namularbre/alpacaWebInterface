class HomeModel {
    async getResponse(question) {
        const url = '/alpaca?' + new URLSearchParams({"question" : question});

        let httpResponse = await fetch(url);

        if (httpResponse.status === 200) {
            httpResponse = await httpResponse.json();
            let response = httpResponse.response;
            response = response.split('[?25h')[1];
            //removing windows CMD special chars
            response = response.replace(/^a-zA-Z0-9 ]/g, '');
            response = response.replace(/\x1B\[[0-9;]*[mG]/g, '');
            response = response.replace('[K', '');
            response = response.replace('\r\n', '');
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
            const questionInput = document.querySelector('#question');

            if (questionInput.value.length >= 3) {
                await this.#view.displayQuestion(questionInput.value);
            }

            const response = await this.#model.getResponse(questionInput.value);
            await this.#view.displayResponse(response);
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
        console.log(response);

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
}

const homeModel = new HomeModel();
const homeView = new HomeView();
let homeController = new HomeController(homeModel, homeView);

homeController.init().catch(error => console.error(error.message));
