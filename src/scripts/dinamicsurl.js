import { LocalCartRepo, ShopCart } from "../../dist/cart.js";
import { ProductClass, JsonProductRepo } from "../../dist/produto.js";


const cartBtn = document.querySelector(".cart-button");
const params = new URLSearchParams(window.location.search);
const idParam = params.get("id");
const id = idParam ? Number(idParam) : null;

const repoProduct = new JsonProductRepo();
const repo = new LocalCartRepo();
const cart = new ShopCart(repo);
const manager = new ProductClass(repoProduct);

if (id === null || isNaN(id)) {
    console.error("ID inválido na URL");
} else {
    
    const produto = manager.getProductById(id);

    const main = document.querySelector(".main-image");
    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");
    const img3 = document.querySelector(".img3");
    const buybtn = document.getElementById("buynow")
    const titulo = document.querySelector(".product-title");
    const desc = document.querySelector(".product-desc");
    const preco = document.querySelector(".product-price");

    
    

    if(buybtn){ 
        buybtn.addEventListener("click", () => {
        const numero = "559997200143"; 
        const url = window.location.origin + "/src/" + produto.link.replace("../", "");
        const texto = url+"--------"+(produto.preco/100).toLocaleString("BRL" , { currency: "BRL", style: "currency" });
        window.open(`https://wa.me/${numero}?text=${texto}`, "_blank"); 
    })
    }
    if (titulo) titulo.textContent = produto.nome;
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
        AtualizarCart()
        atualizarBotao();

        console.log("Produto no carrinho:", cart.verCarrinho());
    });
}


const AtualizarCart = () => {

    const itens = document.getElementById("cart-items");

    const contador = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const produtos = cart.verCarrinho();

    contador.textContent = produtos.length;

    cartTotal.textContent = cart.verTotal();

    itens.innerHTML = "";

    for (const produto of produtos) {

        const container = document.createElement("div");
        container.classList.add(
            "d-flex",
            "align-items-center",
            "justify-content-between",
            "mb-3",
            "pb-2",
            "border-bottom"
        );

        const img = document.createElement("img");
        if (window.location.pathname === "/index.html") {
            img.src = repoProduct.getProductById(produto.id).img1.replace("..", "src");
        } else {
            img.src = repoProduct.getProductById(produto.id).img1
        }

        img.style.width = "50px";
        img.style.height = "50px";
        img.style.objectFit = "cover";
        img.classList.add("rounded");

        const detalhes = document.createElement("div");
        detalhes.classList.add("d-flex", "flex-column", "ms-3", "flex-grow-1");

        const titulo = document.createElement("span");
        titulo.textContent = produto.nome;
        titulo.classList.add("fw-bold");

        const preco = document.createElement("span");
        preco.textContent = (produto.preco / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        detalhes.appendChild(titulo);
        detalhes.appendChild(preco);

        const btnRemover = document.createElement("button");
        btnRemover.classList.add("btn", "btn-sm", "btn-outline-danger");
        btnRemover.innerHTML = `<i class="bi bi-trash"></i>`;

        btnRemover.addEventListener("click", () => {
            cart.removerProduto(produto);
            AtualizarCart();
        });

        container.appendChild(img);
        container.appendChild(detalhes);
        container.appendChild(btnRemover);

        itens.appendChild(container);
    }
};

const btn = document.getElementById("botao-comprar")

btn.addEventListener("click", () => {
    let msg = "Lista de produtos desejados:\n";
    for (let p of cart.verCarrinho()) {
        const url = window.location.origin + "/src/" + p.link.replace("../", "");
        msg += `${url} -------- ${(p.preco / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}\n`;
    }
    msg += `Valor total a pagar: ${cart.verTotal()}`

    const numero = "559997200143"; 
    const texto = encodeURIComponent(msg); 
    window.open(`https://wa.me/${numero}?text=${texto}`, "_blank"); 
});