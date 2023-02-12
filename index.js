"use strict";
exports.__esModule = true;
exports.AxisAlignedBB = exports.getVectorIntermediateZ = exports.getVectorIntermediateY = exports.getVectorIntermediateX = void 0;
var vec3_1 = require("vec3");
function getVectorIntermediateX(origin, v, x) {
    var xDiff = v.x - origin.x;
    if (Math.pow(xDiff, 2) < 0.0000001) {
        return null;
    }
    var f = (x - origin.x) / xDiff;
    if (f < 0 || f > 1) {
        return null;
    }
    return new vec3_1.Vec3(x, origin.y + (v.y - origin.y) * f, origin.z + (v.z - origin.z) * f);
}
exports.getVectorIntermediateX = getVectorIntermediateX;
function getVectorIntermediateY(origin, v, y) {
    var yDiff = v.y - origin.y;
    if (Math.pow(yDiff, 2) < 0.0000001) {
        return null;
    }
    var f = (y - origin.y) / yDiff;
    if (f < 0 || f > 1) {
        return null;
    }
    return new vec3_1.Vec3(origin.x + (v.x - origin.x) * f, y, origin.z + (v.z - origin.z) * f);
}
exports.getVectorIntermediateY = getVectorIntermediateY;
function getVectorIntermediateZ(origin, v, z) {
    var zDiff = v.z - origin.z;
    if (Math.pow(zDiff, 2) < 0.0000001) {
        return null;
    }
    var f = (z - origin.z) / zDiff;
    if (f < 0 || f > 1) {
        return null;
    }
    return new vec3_1.Vec3(origin.x + (v.x - origin.x) * f, origin.y + (v.y - origin.y) * f, z);
}
exports.getVectorIntermediateZ = getVectorIntermediateZ;
var AxisAlignedBB = /** @class */ (function () {
    function AxisAlignedBB(min, max) {
        this.min = min;
        this.max = max;
        if (min.x > max.x) {
            throw Error("minX greater than maxX");
        }
        if (min.y > max.y) {
            throw Error("minY greater than maxY");
        }
        if (min.z > max.z) {
            throw Error("minZ greater than maxZ");
        }
    }
    AxisAlignedBB.prototype.clone = function () {
        return new AxisAlignedBB(this.min.clone(), this.max.clone());
    };
    AxisAlignedBB.prototype.extend = function (dx, dy, dz) {
        if (dx < 0)
            this.min.x += dx;
        else
            this.max.x += dx;
        if (dy < 0)
            this.min.y += dy;
        else
            this.max.y += dy;
        if (dz < 0)
            this.min.z += dz;
        else
            this.max.z += dz;
        return this;
    };
    AxisAlignedBB.prototype.contract = function (x, y, z) {
        this.min.x += x;
        this.min.y += y;
        this.min.z += z;
        this.max.x -= x;
        this.max.y -= y;
        this.max.z -= z;
        return this;
    };
    AxisAlignedBB.prototype.expand = function (x, y, z) {
        this.min.x -= x;
        this.min.y -= y;
        this.min.z -= z;
        this.max.x += x;
        this.max.y += y;
        this.max.z += z;
        return this;
    };
    AxisAlignedBB.prototype.offset = function (x, y, z) {
        this.min.x += x;
        this.min.y += y;
        this.min.z += z;
        this.max.x += x;
        this.max.y += y;
        this.max.z += z;
        return this;
    };
    AxisAlignedBB.prototype.computeOffsetX = function (bb, x) {
        if (bb.max.y > this.min.y && bb.min.y < this.max.y && bb.max.z > this.min.z && bb.min.z < this.max.z) {
            if (x > 0.0 && bb.max.x <= this.min.x) {
                x = Math.min(this.min.x - bb.max.x, x);
            }
            else if (x < 0.0 && bb.min.x >= this.max.x) {
                x = Math.max(this.max.x - bb.min.x, x);
            }
        }
        return x;
    };
    AxisAlignedBB.prototype.computeOffsetY = function (bb, y) {
        if (bb.max.y > this.min.y && bb.min.y < this.max.y && bb.max.z > this.min.z && bb.min.z < this.max.z) {
            if (y > 0.0 && bb.max.y <= this.min.y) {
                y = Math.min(this.min.y - bb.max.y, y);
            }
            else if (y < 0.0 && bb.min.y >= this.max.y) {
                y = Math.max(this.max.y - bb.min.y, y);
            }
        }
        return y;
    };
    AxisAlignedBB.prototype.computeOffsetZ = function (bb, z) {
        if (bb.max.y > this.min.y && bb.min.y < this.max.y && bb.max.z > this.min.z && bb.min.z < this.max.z) {
            if (z > 0.0 && bb.max.z <= this.min.z) {
                z = Math.min(this.min.z - bb.max.z, z);
            }
            else if (z < 0.0 && bb.min.z >= this.max.z) {
                z = Math.max(this.max.z - bb.min.z, z);
            }
        }
        return z;
    };
    AxisAlignedBB.prototype.isVectorInYZ = function (v) {
        return v.y >= this.min.y && v.y <= this.max.y &&
            v.z >= this.min.z && v.z <= this.max.z;
    };
    AxisAlignedBB.prototype.isVectorInXZ = function (v) {
        return v.x >= this.min.x && v.x <= this.max.x &&
            v.z >= this.min.z && v.z <= this.max.z;
    };
    AxisAlignedBB.prototype.isVectorInXY = function (v) {
        return v.x >= this.min.x && v.x <= this.max.x &&
            v.y >= this.min.y && v.y <= this.max.y;
    };
    AxisAlignedBB.prototype.intersects = function (bb) {
        return this.min.x < bb.max.x && this.max.x > bb.min.x &&
            this.min.y < bb.max.y && this.max.y > bb.min.y &&
            this.min.z < bb.max.z && this.max.z > bb.min.z;
    };
    AxisAlignedBB.prototype.isVectorInside = function (v) {
        if (v.x <= this.min.x || v.x >= this.max.x) {
            return false;
        }
        if (v.y <= this.min.z || v.y >= this.max.y) {
            return false;
        }
        return v.z > this.min.z && v.z < this.max.z;
    };
    AxisAlignedBB.prototype.calculateIntercept = function (a, b) {
        var v1 = getVectorIntermediateX(a, b, this.min.x);
        var v2 = getVectorIntermediateX(a, b, this.max.x);
        var v3 = getVectorIntermediateY(a, b, this.min.y);
        var v4 = getVectorIntermediateY(a, b, this.max.y);
        var v5 = getVectorIntermediateZ(a, b, this.min.z);
        var v6 = getVectorIntermediateZ(a, b, this.max.z);
        if (v1 != null && !this.isVectorInYZ(v1)) {
            v1 = null;
        }
        if (v2 != null && !this.isVectorInYZ(v2)) {
            v2 = null;
        }
        if (v3 != null && !this.isVectorInXZ(v3)) {
            v3 = null;
        }
        if (v4 != null && !this.isVectorInXZ(v4)) {
            v4 = null;
        }
        if (v5 != null && !this.isVectorInXY(v5)) {
            v5 = null;
        }
        if (v6 != null && !this.isVectorInXY(v6)) {
            v6 = null;
        }
        var vector = null;
        var distance = Number.MAX_SAFE_INTEGER;
        for (var _i = 0, _a = [
            v1,
            v2,
            v3,
            v4,
            v5,
            v6
        ]; _i < _a.length; _i++) {
            var v_1 = _a[_i];
            if (v_1 != null) {
                var d = a.distanceSquared(v_1);
                if (d < distance) {
                    vector = v_1;
                    distance = d;
                }
            }
        }
        if (vector == null) {
            return null;
        }
        return vector;
    };
    return AxisAlignedBB;
}());
exports.AxisAlignedBB = AxisAlignedBB;
