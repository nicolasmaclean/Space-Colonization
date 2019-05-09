function Leaf(width, height){
    this.pos = new Vector(4 + Math.random()*(width-8), Math.random()*height)
    this.radius = 8;
    this.reached = false;

    this.draw = () => {
        c.strokeStyle = "#333"
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, 4, 0, Math.PI*2, false);
        c.stroke();
    }

    this.set = (nPos) => {
        this.pos = nPos
    }
}
