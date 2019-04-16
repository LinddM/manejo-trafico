/**
 * Vehicle class
 * Defines size based on the Vehicle type
 */
export class Vehicle {
  id: number
  size: number

  /**
   * 
   * @param id Number
   * @param type VehicleType defines the size, types: VehicleType.Car (1), VehicleType.Bus (2), VehicleType.Truck (2)
   */
  constructor(id: number, type: VehicleType){
    this.id = id
    if (type > 1){
      this.size = 2
    }else{
      this.size = type
    }
  }
}

export enum VehicleType {
  Car,
  Bus,
  Truck,
}

function test(){
  let vehi = new Vehicle(12, VehicleType.Bus)
  document.getElementById('test').innerHTML = 'vergitas'
}