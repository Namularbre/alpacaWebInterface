class LoadingAnimationComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="mx-auto position-fixed bottom-50 start-50 translate-middle-x translate-middle-y z-index-2">
                <p>Travail en cours...</p>
            </div>
        `;
    }
}

customElements.define('v-load', LoadingAnimationComponent);
