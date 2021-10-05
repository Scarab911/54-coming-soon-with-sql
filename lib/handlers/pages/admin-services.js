const _data = require('../../data');
const header = require('../../components/header');
const helpers = require('../../helpers');

async function adminServicesPageHandler(data) {

    // const [rows] = await data.db.execute('SELECT * FROM `users`');
    // console.log(rows);

    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');

    headHTML = headHTML.replace('{{page-css}}', 'admin-services');

    const servicesNames = await _data.list('services');
    let tableHTML = '';
    let index = 0;

    for (const serviceName of servicesNames) {
        const serviceData = await _data.read('services', serviceName);
        const serviceDataObj = helpers.parseJsonToObject(serviceData);
        const active = serviceDataObj.isActive ? 'Active' : 'Not active';
        tableHTML += `<div class="item" data-slug="${serviceDataObj.slug}">
                        <div class="cell">${++index}</div>
                        <div class="cell">${serviceDataObj.serviceName}</div>
                        <div class="cell">${serviceDataObj.price} EUR</div>
                        <div class="cell">${active}</div>
                        <div class="cell">
                            <button class="fa fa-pencil"></button>
                            <button class="fa fa-trash"></button>
                        </div>
                    </div>`;
    }

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        <section class="center-table">
                            <a href="/admin/add-service" class="btn">Add service</a>
                            <h2 class="section-title">Services</h2>
                            <div class="table">
                                <div class="head">
                                    <div class="cell">#</div>
                                    <div class="cell">Name</div>
                                    <div class="cell">Price</div>
                                    <div class="cell">Active</div>
                                    <div class="cell">Actions</div>
                                </div>
                                <div class="content">
                                    ${tableHTML}
                                </div>
                            </div>
                        </section>
                    </main>
                    ${footerHTML}

                    <script src="/js/services.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = adminServicesPageHandler;