export type produto = {
    id: number;
    nome: string;
    desc: string;
    preco: number;
    link: string;
    img1: string;
    img2: string;
    img3: string;
    favorite?: true;
};
export interface Cart {
    add(produto: produto): void;
    dropItem(produto: produto): void;
    calcularPrecoTotal(): string;
    getProducts(): produto[];
    getProdutoById(id: number): produto;
}
export declare class LocalCartRepo implements Cart {
    private productList;
    constructor();
    add(produto: produto): void;
    dropItem(produto: produto): void;
    calcularPrecoTotal(): string;
    getProducts(): produto[];
    get totalDisplay(): string;
    getProdutoById(id: number): produto;
    private salvarCarrinho;
    private carregarCarrinho;
    private validar;
}
export declare class ShopCart {
    private repo;
    constructor(repo: Cart);
    adicionarProduto(produto: produto): void;
    removerProduto(produto: produto): void;
    verCarrinho(): produto[];
    verTotal(): string;
    pegarProdutoPorId(id: number): produto;
}
//# sourceMappingURL=cart.d.ts.map