// IMPORT
import { Clock } from "./components/clock/Clock.js";
import { Form } from "./components/form/Form.js";
import { Progressbar } from "./components/progress-bar/ProgressBar.js";
import { socials } from "./components/socials/socials.js";
import { SocialsOOP } from "./components/socials/SocialsOOP.js";
import { Toast } from "./components/toast/Toast.js";
import { clockData } from "./data/clockData.js";
import { socialsData } from "./data/socialsData.js";

// EXECUTION
const toast = new Toast;

new Clock('#clock_1', clockData);
// socials('footer .socials', socialsData);
new Progressbar('.left-column');
new SocialsOOP('footer .socials', socialsData);
new Form('.hero form', toast);
new Form('main form', toast);
