const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

var tree;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    tree = new Tree(new Vector(canvas.width/2, canvas.height), canvas.width, canvas.height-200);
    tree.draw();
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#333";
    c.fillRect(0, 0, canvas.width, canvas.height);

    tree.update();
}

window.addEventListener('resize', init);

init();
animate();