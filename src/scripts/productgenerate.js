import { ProductClass, JsonProductRepo } from "../../dist/produto.js";

const repo = new JsonProductRepo()
const manager = new ProductClass(repo)
console.log("1")
manager.generateProduct()
console.log("2")