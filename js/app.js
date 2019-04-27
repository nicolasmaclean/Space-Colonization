const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', init);

init();