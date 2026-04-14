import { produto } from "./cart";
interface ProductManage {
    generateProduct(): void;
    getProductById(id: number): produto;
}
export declare class JsonProductRepo implements ProductManage {
    productList: Array<produto>;
    generateProduct(): void;
    getProductById(id: number): produto;
}
export declare class ProductClass {
    repo: ProductManage;
    constructor(repo: ProductManage);
    getProductById(id: number): produto;
    generateProduct(): void;
}
export {};
//# sourceMappingURL=produto.d.ts.map