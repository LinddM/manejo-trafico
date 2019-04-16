/**
 * Vehicle class
 * Defines size based on the Vehicle type
 */
export class Vehicle {
    /**
     *
     * @param id Number
     * @param type VehicleType defines the size, types: VehicleType.Car (1), VehicleType.Bus (2), VehicleType.Truck (2)
     */
    constructor(id, type) {
        this.id = id;
        if (type > 1) {
            this.size = 2;
        }
        else {
            this.size = type;
        }
    }
}
export var VehicleType;
(function (VehicleType) {
    VehicleType[VehicleType["Car"] = 0] = "Car";
    VehicleType[VehicleType["Bus"] = 1] = "Bus";
    VehicleType[VehicleType["Truck"] = 2] = "Truck";
})(VehicleType || (VehicleType = {}));
function test() {
    let vehi = new Vehicle(12, VehicleType.Bus);
    document.getElementById('test').innerHTML = 'vergitas';
}
