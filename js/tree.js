const maxDistance = 20;
const minDistance = 5;

function Tree(pos, width, height){
    this.branches = [];
    this.leaves = [];
    this.pos = pos;
    this.width = width;
    this.height = height;
    
    //draws the tree
    this.draw = () => {
        for(let i = 0; i < this.branches.length; i++){
            this.branches[i].draw();
        }
        for(let i = 0; i < this.leaves.length; i++){
            this.leaves[i].draw();
        }
    }
    
    //updates the tree
    this.update = () => {
        this.grow();
        this.draw();
    }

    //grows the tree
    this.grow = () => {
        for(let i = 0; i < this.leaves.length; i++){
            let leaf = this.leaves[i];
            let closestBranch = null;
            let record = maxDistance;
            for(let j = 0; j < this.branches.length; j++){
                let branch = this.branches[i];
                let d = vDistance(leaf.pos, branch.pos);
                if(d < minDistance){
                    this.reached = true;
                    closestBranch = null;
                    break;
                } else if(d < record){
                    closestBranch = branch;
                    record = d;
                }
            }
            
            if(closestBranch !== null){
                var nDir = vSubtract(closestBranch.pos, leaf.pos);
                nDir.normalize();
                closestBranch.dir.add(nDir);
                closestBranch.count++;
            }
        }
        
        //deletes leaves too close to a branch
        for(let i = this.leaves.length-1; i >= 0; i--){
            if(this.leaves[i].reached){
                this.leaves.splice(i, 1);
            }
        }
        
        for(let i = this.branches.length-1; i >= 0; i--){
            let branch = this.branches[i];
            if(branch.count > 0){
                branch.dir.divVal(branch.count+1);
                this.branches.push(branch.next());
                branch.reset();
            }
        }
    }
    
    //makes leaves
    this.makeLeaves = () => {
        for(let i = 0; i < 100; i++){
            let leaf = new Leaf(this.width, this.height);
            this.leaves.push(leaf);
        }

        //makes sure the tree will split eventually
        let centerLeaf = new Leaf(this.width, this.height);
        centerLeaf.set(new Vector(this.pos.x, Math.random()*height))
        this.leaves.push(centerLeaf);
    }

    //finds the center of mass for the leaves
    this.leafMassCenter = () => {
        let totalMassX = 0;
        let totalMassY = 0;
        let count = this.leaves.length;
        for(let i = 0; i < count; i++){
            totalMassX += this.leaves[i].x;
            totalMassY += this.leaves[i].y;
        }
        return new Vector(totalMassX/count, totalMassY/count)
    }

    //makes the tree
    this.initializeTree = () => {
        //makes leaves
        this.makeLeaves();
        
        //makes root at pos and directs to center of mass
        let pos = new Vector(this.pos.x, this.pos.y);
        let centerMass = this.leafMassCenter();
        let dir = new Vector(0, -1);//vSubtract(centerMass, pos);
        dir.normalize();
        let root = new Branch(null, pos, dir);
        this.branches.push(root);

        let current = root;
        let found = false;

        do {
            for(let i = 0; i < this.leaves.length; i++){
                var d = vDistance(current.pos, this.leaves[i].pos);
                if(d < maxDistance){
                    found = true;
                }
            }
            
            if(!found){
                var branch = current.next();
                current = branch;
                this.branches.push(current);
            }
        }while(!found)
    }

    this.initializeTree();
}