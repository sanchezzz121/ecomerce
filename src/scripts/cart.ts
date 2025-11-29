export type produto = {
    id: number
    nome: string;
    desc: string;
    preco: number; 
    link: string;
    img1: string;
    img2: string;
    img3: string;
    favorite?:true
}

export interface Cart {
    add(produto: produto): void;
    dropItem(produto: produto): void;
    calcularPrecoTotal(): string;
    getProducts(): produto[];
    getProdutoById(id: number): produto;
}

export class LocalCartRepo implements Cart {
    private productList: produto[];

    constructor() {
        this.productList = this.carregarCarrinho();
    }

    add(produto: produto): void {
        if (!this.validar(produto)) {
            produto.favorite = true
            this.productList.push(produto);
            this.salvarCarrinho();
        }
    }

    dropItem(produto: produto): void {
        produto.favorite = undefined
        this.productList = this.productList.filter(p => p.id !== produto.id);
        this.salvarCarrinho();
    }

    calcularPrecoTotal(): string {
        const valorTotal = this.productList.reduce((acc, p) => acc + p.preco, 0);
        return (valorTotal / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    getProducts(): produto[] {
        return [...this.productList];
    }

    get totalDisplay(): string {
        return this.calcularPrecoTotal();
    }

    getProdutoById(id: number): produto {
        const produto = this.productList.find(p => p.id === id);
        if (!produto) throw new Error("Produto não encontrado");
        return produto;
    }

    private salvarCarrinho(): void {
        localStorage.setItem("shop_cart", JSON.stringify(this.productList));
    }

    private carregarCarrinho(): produto[] {
        return JSON.parse(localStorage.getItem("shop_cart") || "[]");
    }

    private validar(produto:produto):boolean {
        return this.productList.some(p=>p.id===produto.id)
    }
}

export class ShopCart {
    private repo: Cart;

    constructor(repo: Cart) {
        this.repo = repo;
    }

    adicionarProduto(produto: produto) {
        this.repo.add(produto);
    }

    removerProduto(produto: produto) {
        this.repo.dropItem(produto);
    }

    verCarrinho(): produto[] {
        return this.repo.getProducts();
    }

    verTotal(): string {
        return this.repo.calcularPrecoTotal();
    }

    pegarProdutoPorId(id:number) {
        return this.repo.getProdutoById(id)
    }

}





