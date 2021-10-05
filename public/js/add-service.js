import { ajax } from "./ajax.js";

const formMessageDOM = document.querySelector('.form-messages');
const pFormMessageDOM = formMessageDOM.querySelector('.message');
const closeMessageDOM = formMessageDOM.querySelector('.close');
const serviceNameDOM = document.getElementById('service_name');
const slugDOM = document.getElementById('slug');
const shortDescDOM = document.getElementById('short_desc');
const fullDescDOM = document.getElementById('full_desc');
const priceDOM = document.getElementById('price');
const isActiveDOM = document.getElementById('is_active');
const submitDOM = document.querySelector('button');

function showMessage(state, msg) {
    const allowedStates = ['info', 'success', 'error'];
    if (allowedStates.includes(state)) {
        formMessageDOM.classList.add('show');
        formMessageDOM.dataset.state = state;
        pFormMessageDOM.innerText = msg;
    }
}

function closeMessage() {
    formMessageDOM.classList.remove('show');
}

function submitFormInfo(e) {
    e.preventDefault();

    const serviceName = serviceNameDOM.value;
    const slug = slugDOM.value;
    const shortDesc = shortDescDOM.value;
    const fullDesc = fullDescDOM.value;
    const price = priceDOM.value;
    const isActive = isActiveDOM.checked;

    if (serviceName === '') {
        return showMessage('error', '"Service name" negali buti tuscias');
    }
    if (slug === '') {
        return showMessage('error', '"URL slug" negali buti tuscias');
    }
    if (isActive) {
        if (shortDesc === '') {
            return showMessage('error', '"Short description" negali buti tuscias');
        }
        if (fullDesc === '') {
            return showMessage('error', '"Full description" negali buti tuscias');
        }
        if (price === '') {
            return showMessage('error', '"Price" negali buti tuscias');
        }
    }

    closeMessage();
    ajax({
        method: 'POST',
        headers: {},
        endpoint: 'api/services',
        data: {
            serviceName,
            slug,
            shortDesc,
            fullDesc,
            price,
            isActive,
        }
    }, responseAction);
}

function responseAction(response) {
    try {
        const responseObject = JSON.parse(response);
        if (responseObject.error) {
            showMessage('error', responseObject.error);
            return;
        }
        showMessage('success', responseObject.success);
    } catch (error) {
        showMessage('error', 'Serverio klaida!');
    }
}

closeMessageDOM.addEventListener('click', closeMessage);

submitDOM.addEventListener('click', submitFormInfo);