const maxDistance = 80;
const minDistance = 3;

function Tree(pos, width, height){
    this.branches = [];
    this.leaves = [];
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.found = false;
    
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
        if(!this.found){
            let current = this.branches[this.branches.length-1];
            for(let i = 0; i < this.leaves.length; i++){
                var d = vDistance(current.pos, this.leaves[i].pos);
                //checks if current branch is close to a leaf
                if(d < maxDistance){
                    this.found = true;
                }
            }

            //makes another branch
            if(!this.found){
                var branch = current.next();
                current = branch;
                this.branches.push(current);
            }
        } else {
            for(let i = 0; i < this.leaves.length; i++){
                    var leaf = this.leaves[i];
                    var closestBranch = null;
                    var record = maxDistance;
                for(let j = 0; j < this.branches.length; j++){
                    var branch = this.branches[j];
                    var d = vDistance(leaf.pos, branch.pos);
                    if(d < minDistance){
                        leaf.reached = true;
                        closestBranch = null;
                        break;
                    } else if(d < record){
                        closestBranch = branch;
                        record = d;
                    }
                }
                
                if(closestBranch != null){
                    var nDir = vSubtract(leaf.pos, closestBranch.pos);
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
                var branch = this.branches[i];
                if(branch.count > 0){
                    branch.dir.divVal(branch.count+1);
                    this.branches.push(branch.next());
                    branch.reset();
                }
            }
        }
    }
    
    //makes leaves
    this.makeLeaves = () => {
        for(let i = 0; i < 1000; i++){
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
        let leafAmt = this.leaves.length;
        for(let i = 0; i < leafAmt; i++){
            totalMassX += this.leaves[i].pos.x;
            totalMassY += this.leaves[i].pos.y;
        }
        return new Vector(totalMassX/leafAmt, totalMassY/leafAmt);
    }

    //makes the tree
    this.initializeTree = () => {
        //makes leaves
        this.makeLeaves();
        
        // makes root
        let pos = this.pos.copy();
        let dir = new Vector(0, -1);
        // let centerMass = this.leafMassCenter();
        // let dir = vSubtract(centerMass, pos);
        // dir.normalize();
        let root = new Branch(null, pos, dir);
        this.branches.push(root);
    }

    this.initializeTree();
}