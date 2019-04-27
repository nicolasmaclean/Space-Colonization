//2d vector class
function Vector(x, y){
    this.x = x;
    this.y = y;

    //adds to vector
    this.add = (v) => {
        this.x += v.x;
        this.y += v.y;
    }

    //adds val to both x and y
    this.addVal = (val) => {
        this.x += val;
        this.y += val;
    }

    //adds val to x, not y
    this.addValX = (val) => {
        this.x += val;
    }

    //adds val to y, not x
    this.addValY = (val) => {
        this.y += val;
    }

    //subtracts from vector
    this.subtract = (v) => {
        this.x -= v.x;
        this.y -= v.y;
    }

    //subtracts val from both x and y
    this.subVal = (val) => {
        this.x -= val;
        this.y -= val;
    }

    //subtracts val from x, not y
    this.subValX = (val) => {
        this.x -= val;
    }

    //subtracts val from y, not x
    this.subValY = (val) => {
        this.y -= val;
    }

    //returns magnitude of vector
    this.magnitude = () => {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    //returns the magnitude squared, is faster than if squarerooted
    this.magnitudeSQ = () => {
        return this.x*this.x + this.y*this.y;
    }

    //multiplies by a vector
    this.mult = (v) => {
        this.x *= v.x;
        this.y *= v.y;
    }

    //mults both x and y by a value
    this.multVal = (val) => {
        this.x *= val;
        this.y *= val;
    }

    //multiplies x by a value, not y
    this.multValX = (val) => {
        this.x *= val;
    }

    //multiplies y by a value, not x
    this.multValY = (val) => {
        this.y *= val;
    }

    //divides this vector by the other
    this.div = (v) => {
        this.x /= v.x;
        this.y /= v.y;
    }

    //divides by a val
    this.divVal = (val) => {
        this.x /= val;
        this.y /= val;
    }

    //divides the x component by val
    this.divValX = (val) => {
        this.x /= val;
    }
    
    //divides the y component by val
    this.divValY = (val) => {
        this.y /= val;
    }

    //rotates to the specific angle
    this.rotateTo = (rad) => {
        let magn = this.magnitude();
        this.x = Math.cos(rad) * magn;
        this.y = Math.sin(rad) * magn;
    }

    // returns the current angle between hypotunse and x-axis
    this.getAngle = () =>{
        if(this.x < 0)
            return Math.PI + Math.atan(this.y/this.x);
        return Math.atan(this.y/this.x);
    }
    
    //rotates the vector by the given angle
    this.rotate = (rad) => {
        let magn = this.magnitude();
        let ang = this.getAngle();
        this.x = Math.cos(ang + rad) * magn;
        this.y = Math.sin(ang + rad) * magn;
    }

    this.normalize = () => {
        let m = this.magnitude();
        if(m !== 0){
            this.divVal(m);
        }
    }

    //multiples the magnitude of the vector by val and changes the components to reflect that
    this.magnitudeMultVal = (val) => {
        let n = vNormalize(this);
        this.multVal(n, val);
    }

    this.copy = () => {
        return new Vector(this.x, this.y);
    }
}

function vSubtract(v1, v2){
    return new Vector(v1.x - v2.x, v1.y - v2.y);
}

function vSubVal(v1, val){
    return new Vector(v1.x - val, v1.y - val);
}

function vSubValX(v1, val){
    return new Vector(v1.x - val, v1.y);
}

function vSubValY(v1, val){
    return new Vector(v1.x, v1.y - val);
}

function vAdd(v1, v2){
    return new Vector(v1.x + v2.x, v1.y + v2.y);
}

function vAddValX(v, val){
    return new Vector(v.x + val, v.y + val);
}

function vAddValX(v, val){
    return new Vector(v.x + val, v.y);
}

function vAddValY(v, val){
    return new Vector(v.x, v.y + val);
}

function vMagnitude(v){
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function vMagnitudeSQ(v){
    return v.x * v.x + v.y * v.y;
}

function vMult(v1, v2){
    return new Vector(v1.x * v2.x, v1.y * v2.y);
}

function vMultVal(v, val){
    return new Vector(v.x * val, v.y * val);
}

function vMultValX(v, val){
    return new Vector(v.x * val, v.y);
}

function vMultValY(v, val){
    return new Vector(v.x, v.y * val);
}

function vDiv(v1, v2){
    return new Vector(v1.x/v2.x, v1.y/v2.y);
}

function vDivVal(v, val){
    return new Vector(v.x/val, v.y/val);
}

function vDivValX(v, val){
    return new Vector(v.x/val, v.y);
}

function vDivValY(v, val){
    return new Vector(v.x, v.y/val);
}

function vRotateTo(v, rad){
    let magn = vMagnitude(v);
    let newX  = Math.cos(rad) * magn;
    let newY  = Math.sin(rad) * magn;
    return new Vector(newX, newY);
}

function getAngle(v){
    return Math.atan(v.y/v.x);
}

function vRotate(v, rad){
    let magn = vMagnitude(v);
    let ang = getAngle(v);
    let newX  = Math.cos(ang + rad) * magn;
    let newY  = Math.sin(ang + rad) * magn;
    return new Vector(newX, newY);
}

function vNormalize(v){
    let m = v.magnitude();
    if(m != 0){
        return vDivVal(m);
    }
    return new Vector(0, 0);
}

function vMagnitudeMultVal(v, val){
    let n = vNormalize(v);
    return vMultVal(n, val);
}

function vCopy(v){
    return new Vector(v.x, v.y);
}