"use strict";
exports.__esModule = true;
var Vehicle = /** @class */ (function () {
    function Vehicle(id, type) {
        this.id = id;
        if (type > 1) {
            this.size = 2;
        }
        else {
            this.size = type;
        }
    }
    return Vehicle;
}());
exports.Vehicle = Vehicle;
var VehicleType;
(function (VehicleType) {
    VehicleType[VehicleType["Car"] = 0] = "Car";
    VehicleType[VehicleType["Bus"] = 1] = "Bus";
    VehicleType[VehicleType["Truck"] = 2] = "Truck";
})(VehicleType = exports.VehicleType || (exports.VehicleType = {}));
