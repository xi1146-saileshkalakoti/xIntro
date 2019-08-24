$("#homeStartButton").click(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': 39 }));
})

$("#navArrowPrev").click(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': 37 }));
})

$("#navArrowNext").click(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': 39 }));
})
