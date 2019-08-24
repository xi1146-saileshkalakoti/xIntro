import 'loaders.css';
import './scss/base.scss';
import './scss/splash.scss';
import './scss/home.scss';
import './scss/bornInNetherlands.scss';
import './scss/components.scss';
import './scss/ourOffices.scss';
import './scss/feelingBored.scss';
import './scss/thankyou.scss';
import './scss/thingsToRemember.scss';
import './scss/toolsWeUse.scss';
import './scss/toolsBox.scss';
import './scss/cultureOfInovation.scss';
import './scss/culture.scss';
import './scss/xebiaGroup.scss';
import './scss/organizationStructure.scss';
import './scss/organizationMatrix.scss';
import './scss/animations.scss';
import { screens, DEFAULT_SCREEN_TO_SHOW } from './controlBox/constants';
import { moveScreensOnKey } from './controlBox/navigation';
import './controlBox/customAction';
import './controlBox/organizationStructure';
import './controlBox/organizationMatrix';

document.addEventListener('keydown', moveScreensOnKey);

//default screen set to splash
for (screen of screens) {
    if (screen !== DEFAULT_SCREEN_TO_SHOW) {
        $(screen).hide();
    }
}