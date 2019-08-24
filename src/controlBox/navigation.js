import { screens, DEFAULT_SCREEN_INDEX, SHOW_NAV_FROM_INDEX } from './constants';
let currentScreenIndex = DEFAULT_SCREEN_INDEX;
let animationInProgress = false;

function showNavIcons() {
    if (currentScreenIndex >= SHOW_NAV_FROM_INDEX) {
        $('#navArrows').show();
    } else {
        $('#navArrows').hide();
    }
}
function moveNext(index) {
    if (screens[currentScreenIndex + 1] !== undefined) {
        currentScreenIndex = currentScreenIndex + 1;
    }
}
function movePrevious() {
    if (screens[currentScreenIndex - 1] !== undefined) {
        currentScreenIndex = currentScreenIndex - 1;
    }
}
function displayScreen() {
    $(screens[currentScreenIndex]).show();
}

function hideScreen() {
    $(screens[currentScreenIndex]).hide();
}

function doAnimationSlideOut(fn) {
    $(screens[currentScreenIndex]).addClass('slide-out-left');
    setTimeout(() => {
        fn();
    }, 250)
}
function doAnimationSlideOutRight(fn) {
    $(screens[currentScreenIndex]).addClass('slide-out-right');
    setTimeout(() => {
        fn();
    }, 250)
}

function doAnimationSlideIn(fn) {
    animationInProgress = true;
    $(screens[currentScreenIndex]).addClass('slide-in-right');
    setTimeout(() => {
        fn();
        animationInProgress = false;
    }, 250);
}


function doAnimationSlideInLeft(fn) {
    animationInProgress = true;
    $(screens[currentScreenIndex]).addClass('slide-in-left');
    setTimeout(() => {
        fn();
        animationInProgress = false;
    }, 250);
}


function removeClass(cssClassName) {
    $(screens[currentScreenIndex]).removeClass(cssClassName);
}

function animatePrevious() {
    doAnimationSlideOutRight(() => {
        hideScreen();
        removeClass('slide-out-right');
        movePrevious();
        displayScreen();
        doAnimationSlideInLeft(() => {
            removeClass('slide-in-left');
        });
    })
}

function animateNext() {
    doAnimationSlideOut(() => {
        hideScreen();
        removeClass('slide-out-left');
        moveNext();
        displayScreen();
        doAnimationSlideIn(() => {
            removeClass('slide-in-right');
        })
    });
}


export function moveScreensOnKey(event) {
    if (!animationInProgress) {
        switch (event.keyCode) {
            case 37:
                animatePrevious();
                break;
            case 39:
                animateNext();
                break;
            default:
        }
        showNavIcons();
    }

};

