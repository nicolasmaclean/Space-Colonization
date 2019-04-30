const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

var tree;
var mouse;
// var fps = 60;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(mouse === undefined){
        mouse = new Vector(canvas.width/2, 0);//canvas.height);
    }

    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    tree = new Tree(mouse, canvas.width, canvas.height-200);
    tree.draw();
}

function animate() {
    // setTimeout( () => {
        requestAnimationFrame(animate);
        c.fillStyle = "#333";
        c.fillRect(0, 0, canvas.width, canvas.height);

        tree.update();
    // }, 1000/fps);
}

window.addEventListener('resize', init);
window.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    init();
})

init();
animate();