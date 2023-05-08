class LoadingAnimationComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="spinner-grow mx-auto position-fixed bottom-50 start-50 translate-middle-x translate-middle-y z-index-2">
                <span class="sr-only m-3" role="status"></span>
            </div>
        `;
    }
}

customElements.define('v-load', LoadingAnimationComponent);
