import { LocalCartRepo, ShopCart } from "./cart.js";
import { JsonProductRepo } from "./produto.js";
const btn = document.getElementById("botao-comprar")



const repo = new LocalCartRepo();
const cart = new ShopCart(repo);
const jsonrepo = new JsonProductRepo()
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
            img.src = jsonrepo.getProductById(produto.id).img1.replace("..", "src");
        } else {
            img.src = jsonrepo.getProductById(produto.id).img1
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

AtualizarCart();


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

