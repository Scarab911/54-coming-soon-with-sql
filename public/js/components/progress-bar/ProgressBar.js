class Progressbar {
    constructor(selector) {
        this.selector = selector;

        this.DOM = null;
        this.allProgressBarDOM = null;
        this.animatedElementsCount = 0;

        this.init();
    }

    init() {
        if (!this.isValidSelector()) {
            console.error('ERROR: nepraejo pirmines patikros');
            return false;
        }

        this.DOM = document.querySelector(this.selector);
        if (!this.DOM) {
            console.error('ERROR: nerestas elementas, pagal duota selector');
            return false;
        }

        this.allProgressBarDOM = this.DOM.querySelectorAll('.progress-bar');
        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }

    addEvents() {
        window.addEventListener('scroll', () => {
            if (this.animatedElementsCount === this.allProgressBarDOM.length) {
                return;
            }

            const screenBottom = window.scrollY + window.innerHeight;
            this.animatedElementsCount = 0;

            for (const progressBarDOM of this.allProgressBarDOM) {
                const progressBarBottom = progressBarDOM.offsetTop + progressBarDOM.offsetHeight;

                if (screenBottom >= progressBarBottom) {
                    progressBarDOM.classList.add('loading');
                    this.animatedElementsCount++;
                }
            }
        })
    }
}

export { Progressbar }