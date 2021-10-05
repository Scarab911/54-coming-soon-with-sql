class Toast {
    constructor() {
        this.bodyDOM = document.querySelector('body');
        this.DOM = null;
        this.titleDOM = null;
        this.messageDOM = null;
        this.closeDOM = null;

        this.timer = null;
        this.closeDelay = 5000;

        this.render();
        this.addEvents();
    }

    render() {
        const HTML = `<div class="toast hide" data-state="success">
                        <i class="fa fa-check"></i>
                        <i class="fa fa-info-circle"></i>
                        <i class="fa fa-exclamation-triangle"></i>
                        <i class="fa fa-shield"></i>
                        <div class="texts">
                            <div class="title">Form validation</div>
                            <div class="message">Demo message about action with a form</div>
                        </div>
                        <i class="fa fa-times"></i>
                    </div>`;

        this.bodyDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = document.querySelector('.toast');
        this.titleDOM = this.DOM.querySelector('.title');
        this.messageDOM = this.DOM.querySelector('.message');
        this.closeDOM = this.DOM.querySelector('.fa-times');
    }

    show(msg, title, state) {
        if (!msg) {
            return false;
        }

        this.DOM.dataset.state = state;
        this.messageDOM.innerText = msg;
        this.titleDOM.innerText = title;

        this.DOM.classList.remove('hide');

        this.timer = setTimeout(() => {
            this.hide();
        }, this.closeDelay)
    }

    hide() {
        this.DOM.classList.add('hide');
        clearTimeout(this.timer);
    }

    success(msg, title = 'Success!') {
        this.show(msg, title, 'success');
    }

    info(msg, title = 'Information!') {
        this.show(msg, title, 'info');
    }

    warning(msg, title = 'Warning!') {
        this.show(msg, title, 'warning');
    }

    error(msg, title = 'Error!') {
        this.show(msg, title, 'error');
    }

    addEvents() {
        this.closeDOM.addEventListener('click', () => {
            this.hide();
        })
    }
}

export { Toast }