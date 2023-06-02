class ChatComponent extends HTMLElement {
    #text;
    #author;
    #background;
    #isAlpaca;
    #chatStyle;

    constructor() {
        super();

        this.#text = "";
        this.#author = "";
        this.#background = "";

        this.#chatStyle = "chat";
    }

    connectedCallback() {
        this.#text = this.getAttribute('text');
        this.#author = this.getAttribute('author');
        this.#background = this.getAttribute('background');

        if (this.#author === "Alpaca")
            this.#chatStyle = 'chat-alpaca';

        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="${this.#chatStyle}">
                <p>
                    ${this.#author}: ${this.#text}
                </p>
            </div>
        `;
    }
}

customElements.define('v-chat', ChatComponent);
