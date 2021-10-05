const ProgressBars = require('../../components/ProgressBars');
const _data = require('../../data');


async function homePageHandler(data) {
    let headHTML = await _data.readTemplateHTML('head');
    const skillsQuery = 'SELECT * FROM `skills`';
    const [progressBarData] = await data.db.execute(skillsQuery);
    const progressBarsObject = new ProgressBars(progressBarData);
    const progressBarsHTML = progressBarsObject.render();

    // const footerHTML = await _data.readTemplateHTML('footer');
    // const heroHTML = await _data.readTemplateHTML('home-hero');
    // const servicesHTML = await _data.readTemplateHTML('services');

    headHTML = headHTML.replace('{{page-css}}', 'home');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    <div class="container hero bg-primary">
                        <div class="row-small">
                            <img class="logo" src="./img/logo.png" alt="Logo">
                            <h1 class="main-title">Coming soon</h1>
                            <p class="main-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate voluptatibus animi laudantium quaerat est fugiat cupiditate adipisci quae iure.</p>
                            <div id="clock_1" class="clock">CLOCK 1</div>
                            <form>
                                <input data-validation="email" id="subscribe_email" type="email" placeholder="Type your email" required>
                                <button class="btn" type="submit">Subscribe now</button>
                            </form>
                            <div class="mouse">
                                <div class="wheel"></div>
                            </div>
                        </div>
                    </div>

                    <main class="container">
                        <div class="row-big">
                            <div class="left-column">
                                <h2 class="section-title">About startup</h2>
                                <p class="section-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, animi esse. Quia quisquam <a href="#">Matrox</a> earum magni nulla tempore, veritatis, quas eos itaque facilis in reprehenderit, voluptatum illo delectus odio fugiat laudantium quod.</p>
                                ${progressBarsHTML}
                            </div>
                            <div class="right-column">
                                <h2 class="section-title">Have any question</h2>
                                <p class="section-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, animi esse. Quia quisquam distinctio <a href="mailto:person@mail.xyz">person@mail.xyz</a> tempore, veritatis, quas eos itaque facilis in reprehenderit, voluptatum illo delectus odio fugiat laudantium quod.</p>
                                <form>
                                    <input data-validation="name" id="message_name" type="text" placeholder="Name" required>
                                    <input data-validation="email" id="message_email" type="email" placeholder="Email" required>
                                    <textarea data-validation="text" id="message_text" placeholder="Message" required maxlength="20"></textarea>
                                    <button class="btn" type="submit">Send message</button>
                                </form>
                            </div>
                        </div>
                    </main>

                    <footer class="container bg-primary">
                        <div class="row-big socials">
                            <a href="#" class="fa fa-angle-up btn-round back-to-top"></a>
                        </div>
                        <div class="row-small bottom-texts">
                            <img class="footer-logo" src="./img/logo-white.png" alt="Logo white">
                            <div class="multi-text">
                                <div>Copyright &copy; 2021 <a href="#">Matrox</a></div>
                                <div>All rights reserved</div>
                                <div>Designed by <a href="#" target="_blank">TrendyTheme</a></div>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia perspiciatis, iusto libero tempora nulla veritatis aspernatur illo numquam <a href="#">200+</a> maiores molestias repudiandae. Commodi tempore voluptatibus et mollitia fuga <a href="#">Matrox</a> deserunt libero?</p>
                        </div>
                    </footer>

                    <script src="/js/home.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = homePageHandler;