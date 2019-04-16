import { Path } from "paper";
import { Vehicle } from "./Vehicle"
export class StreetNode {
  id: number
  x: number
  y: number
  capacity: Array<number> = []
  direction: Array<StreetNode> = []
  intersects: Array<Path> = []
  relationships: Array<StreetNode> = []
  vehicles: Array<Array<Vehicle>> = []
  output: number = 1
  input: number = 1
  go: boolean
  constructor (id: number, x: number, y: number, lanes: number) {
    this.id = id
    this.x = x
    this.y = y
    for (let i = 0; i < lanes; i++) {
      this.capacity.push(2)
      this.vehicles.push([])
    }
  }
}
