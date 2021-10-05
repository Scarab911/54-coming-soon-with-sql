import { ajax } from "./ajax.js";

const tableItemsDOM = document.querySelectorAll('.table > .content > .item');

for (const itemDOM of tableItemsDOM) {
    const deleteDOM = itemDOM.querySelector('.fa-trash');
    if (deleteDOM) {
        deleteDOM.addEventListener('click', () => {
            const slug = itemDOM.dataset.slug;
            ajax({
                method: 'DELETE',
                headers: {},
                endpoint: 'api/services?slug=' + slug,
            }, responseAction);
        })
    }
}

function responseAction(response) {
    try {
        const responseObject = JSON.parse(response);
        if (responseObject.error) {
            alert(responseObject.error);
            return;
        }
        alert(responseObject.success);
        location.reload();
    } catch (error) {
        alert('Serverio klaida!');
    }
}