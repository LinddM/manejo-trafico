import { StreetNode } from "./StreetNode";

let pastNode: StreetNode
let firstNode: StreetNode
for (let i = 0; i < 10; i++){
    const streetNode = new StreetNode(i, i, i, 2)
    if (i > 0){
        pastNode.direction.push(streetNode)
    }else{
        firstNode = streetNode
    }
    pastNode = streetNode
}

console.log(firstNode)