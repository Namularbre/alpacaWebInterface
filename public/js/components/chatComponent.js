class ChatComponent extends HTMLElement {
    #text;
    #author;
    #background;

    constructor() {
        super();

        this.#text = "";
        this.#author = "";
        this.#background = "";
    }

    connectedCallback() {
        this.#text = this.getAttribute('text');
        this.#author = this.getAttribute('author');
        this.#background = this.getAttribute('background');

        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container border ${this.#background}">
                <p class="">
                    ${this.#author}: ${this.#text}
                </p>
            </div>     
            <!--user-select-all-->
        `;
    }
}

customElements.define('v-chat', ChatComponent);
