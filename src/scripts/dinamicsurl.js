import { LocalCartRepo, ShopCart } from "../../dist/cart.js";
import { ProductClass, JsonProductRepo } from "../../dist/produto.js";

const cartBtn = document.querySelector(".cart-button");

const params = new URLSearchParams(window.location.search);
const idParam = params.get("id");
const id = idParam ? Number(idParam) : null;

const repoProduct = new JsonProductRepo();
const manager = new ProductClass(repoProduct);

if (id === null || isNaN(id)) {
    console.error("ID inválido na URL");
} else {
    const repo = new LocalCartRepo();
    const cart = new ShopCart(repo);
    const produto = manager.getProductById(id);

    const main = document.querySelector(".main-image");
    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");
    const img3 = document.querySelector(".img3");
    const titulo = document.querySelector(".product-title");
    const desc = document.querySelector(".product-desc");
    const preco = document.querySelector(".product-price");

    if (titulo) titulo.textContent = produto.nome;
    if (desc) desc.textContent = produto.desc;
    if (preco) preco.textContent = (produto.preco / 100).toLocaleString("pt-BR", { currency: "BRL", style: "currency" });

    if (img1) img1.src = produto.img1;
    if (img2 && produto.img2) img2.src = produto.img2;
    if (img3 && produto.img3) img3.src = produto.img3;
    if (main) main.src = produto.img1;

    const atualizarBotao = () => {
        const estaNoCarrinho = cart.verCarrinho().some(p => p.id === produto.id);

        if (estaNoCarrinho) {
            cartBtn.classList.add('favorito');
            cartBtn.textContent = "Favoritado ❤️";
        } else {
            cartBtn.classList.remove('favorito');
            cartBtn.innerHTML = '<i class="bi bi-cart-fill"></i> Adicionar ao Carrinho';
        }
    };

    atualizarBotao();

    cartBtn?.addEventListener("click", () => {
        const estaNoCarrinho = cart.verCarrinho().some(p => p.id === produto.id);

        if (estaNoCarrinho) {
            cart.removerProduto(produto);
        } else {
            cart.adicionarProduto(produto);
        }

        atualizarBotao();

        console.log("Produto no carrinho:", cart.verCarrinho());
    });
}
