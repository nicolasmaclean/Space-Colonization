const length = 5;

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
        // let nPos = vAdd(this.pos, this.dir);
        // let nBranch = new Branch(this, nPos, this.dir.copy());
        // return nBranch;
        var nextDir = vMultVal(this.dir, length);
        var nextPos = vAdd(this.pos, nextDir);
        var nextBranch = new Branch(this, nextPos, this.dir.copy());
        return nextBranch;
    }

    this.reset = () => {
        this.dir = this.originalDir;
        this.count = 0;
    }
}