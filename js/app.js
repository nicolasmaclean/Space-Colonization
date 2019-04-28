const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

var tree;
var mouse = new Vector(canvas.width/2, canvas.height);
// var fps = 60;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse = new Vector(canvas.width/2, canvas.height);

    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    tree = new Tree(new Vector(mouse.x, mouse.y), canvas.width, canvas.height-200);
    tree.draw();
}

function reinit() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    tree = new Tree(new Vector(mouse.x, mouse.y), canvas.width, canvas.height-200);
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
    reinit();
})

init();
animate();