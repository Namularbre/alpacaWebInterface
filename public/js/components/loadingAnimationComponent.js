class LoadingAnimationComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="loader-container">
                <span class="loader"></span>
            </div>
        `;
    }
}

customElements.define('v-load', LoadingAnimationComponent);
