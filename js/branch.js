//anything over about 5 doesn't really work, but can still look cool
const length = 4;

function Branch(parent, pos, dir){
    this.parent = parent;
    this.pos = pos;
    this.dir = dir;
    this.originalDir = this.dir.copy();
    this.count = 0;
    
    this.draw = () => {
        if(this.parent !== null){
            c.strokeStyle = "#fff";
            c.beginPath();
            c.moveTo(this.parent.pos.x, this.parent.pos.y);
            c.lineTo(this.pos.x, this.pos.y);
            c.stroke();
        }
    }

    this.next = () => {
        let nDir = vMultVal(this.dir, length);
        let nPos = vAdd(this.pos, nDir);
        let nBranch = new Branch(this, nPos, this.dir.copy());
        return nBranch;
    }

    this.reset = () => {
        this.dir = this.originalDir;
        this.count = 0;
    }
}
