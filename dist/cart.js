export class LocalCartRepo {
    productList;
    constructor() {
        this.productList = this.carregarCarrinho();
    }
    add(produto) {
        if (!this.validar(produto)) {
            produto.favorite = true;
            this.productList.push(produto);
            this.salvarCarrinho();
        }
    }
    dropItem(produto) {
        produto.favorite = undefined;
        this.productList = this.productList.filter(p => p.id !== produto.id);
        this.salvarCarrinho();
    }
    calcularPrecoTotal() {
        const valorTotal = this.productList.reduce((acc, p) => acc + p.preco, 0);
        return (valorTotal / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
    getProducts() {
        return [...this.productList];
    }
    get totalDisplay() {
        return this.calcularPrecoTotal();
    }
    getProdutoById(id) {
        const produto = this.productList.find(p => p.id === id);
        if (!produto)
            throw new Error("Produto não encontrado");
        return produto;
    }
    salvarCarrinho() {
        localStorage.setItem("shop_cart", JSON.stringify(this.productList));
    }
    carregarCarrinho() {
        return JSON.parse(localStorage.getItem("shop_cart") || "[]");
    }
    validar(produto) {
        return this.productList.some(p => p.id === produto.id);
    }
}
export class ShopCart {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    adicionarProduto(produto) {
        this.repo.add(produto);
    }
    removerProduto(produto) {
        this.repo.dropItem(produto);
    }
    verCarrinho() {
        return this.repo.getProducts();
    }
    verTotal() {
        return this.repo.calcularPrecoTotal();
    }
    pegarProdutoPorId(id) {
        return this.repo.getProdutoById(id);
    }
}
//# sourceMappingURL=cart.js.map