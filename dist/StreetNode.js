"use strict";
exports.__esModule = true;
var StreetNode = /** @class */ (function () {
    function StreetNode(id, x, y, lanes) {
        this.capacity = [];
        this.direction = [];
        this.intersects = [];
        this.relationships = [];
        this.vehicules = [];
        this.output = 1;
        this.input = 1;
        this.id = id;
        this.x = x;
        this.y = y;
        for (var i = 0; i < lanes; i++) {
            this.capacity.push(2);
            this.vehicules.push([]);
        }
    }
    return StreetNode;
}());
exports.StreetNode = StreetNode;
