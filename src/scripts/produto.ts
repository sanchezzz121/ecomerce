import { produto } from "./cart";

interface ProductManage {
    generateProduct(): void;
    getProductById(id: number): produto
}

export class JsonProductRepo implements ProductManage {

    productList: Array<produto> = [
        {
            id: 1,
            nome: "produto1",
            desc: "desc1",
            preco: 100,
            link: "../pages/produto.html?id=1",
            img1: "../img/products/produto1.jpg",
            img2: "../img/products/produto1-2.jpg",
            img3: "../img/products/produto1-3.jpg"
        },
        {
            id: 2,
            nome: "produto2",
            desc: "desc2",
            preco: 100,
            link: "../pages/produto.html?id=2",
            img1: "../img/products/produto2.jpg",
            img2: "../img/products/produto2-2.jpg",
            img3: "../img/products/produto2-3.jpg"
        },
        {
            id: 3,
            nome: "produto3",
            desc: "desc3",
            preco: 100,
            link: "../pages/produto.html?id=3",
            img1: "../img/products/produto3.jpg",
            img2: "../img/products/produto3-2.jpg",
            img3: "../img/products/produto3-3.jpg"
        },
        {
            id: 4,
            nome: "produto4",
            desc: "desc4",
            preco: 100,
            link: "../pages/produto.html?id=4",
            img1: "../img/products/produto4.jpg",
            img2: "../img/products/produto4-2.jpg",
            img3: "../img/products/produto4-3.jpg"
        },
        {
            id: 5,
            nome: "produto5",
            desc: "desc5",
            preco: 100,
            link: "../pages/produto.html?id=5",
            img1: "../img/products/produto5.jpg",
            img2: "../img/products/produto5-2.jpg",
            img3: "../img/products/produto5-3.jpg"
        },
        {
            id: 6,
            nome: "produto6",
            desc: "desc6",
            preco: 100,
            link: "../pages/produto.html?id=6",
            img1: "../img/products/produto6.jpg",
            img2: "../img/products/produto6-2.jpg",
            img3: "../img/products/produto6-3.jpg"
        },
        {
            id: 7,
            nome: "produto7",
            desc: "desc7",
            preco: 100,
            link: "../pages/produto.html?id=7",
            img1: "../img/products/produto7.jpg",
            img2: "../img/products/produto7-2.jpg",
            img3: "../img/products/produto7-3.jpg"
        },
        {
            id: 8,
            nome: "produto8",
            desc: "desc8",
            preco: 100,
            link: "../pages/produto.html?id=8",
            img1: "../img/products/produto8.jpg",
            img2: "../img/products/produto8-2.jpg",
            img3: "../img/products/produto8-3.jpg"
        },
        {
            id: 9,
            nome: "produto9",
            desc: "desc9",
            preco: 100,
            link: "../pages/produto.html?id=9",
            img1: "../img/products/produto9.jpg",
            img2: "../img/products/produto9-2.jpg",
            img3: "../img/products/produto9-3.jpg"
        },
        {
            id: 10,
            nome: "produto10",
            desc: "desc10",
            preco: 100,
            link: "../pages/produto.html?id=10",
            img1: "../img/products/produto10.jpg",
            img2: "../img/products/produto10-2.jpg",
            img3: "../img/products/produto10-3.jpg"
        },
        {
            id: 11,
            nome: "produto11",
            desc: "desc11",
            preco: 100,
            link: "../pages/produto.html?id=11",
            img1: "../img/products/produto11.jpg",
            img2: "../img/products/produto11-2.jpg",
            img3: "../img/products/produto11-3.jpg"
        },
        {
            id: 12,
            nome: "produto12",
            desc: "desc12",
            preco: 100,
            link: "../pages/produto.html?id=12",
            img1: "../img/products/produto12.jpg",
            img2: "../img/products/produto12-2.jpg",
            img3: "../img/products/produto12-3.jpg"
        },
        {
            id: 13,
            nome: "produto13",
            desc: "desc13",
            preco: 100,
            link: "../pages/produto.html?id=13",
            img1: "../img/products/produto13.jpg",
            img2: "../img/products/produto13-2.jpg",
            img3: "../img/products/produto13-3.jpg"
        },
        {
            id: 14,
            nome: "produto14",
            desc: "desc14",
            preco: 100,
            link: "../pages/produto.html?id=14",
            img1: "../img/products/produto14.jpg",
            img2: "../img/products/produto14-2.jpg",
            img3: "../img/products/produto14-3.jpg"
        }
    ]


    generateProduct() {
        const container = document.getElementById("Produto-container");
        if (!container) return;

        container.innerHTML = ""; // opcional: limpa antes de gerar

        for (let produto of this.productList) {
            const div = document.createElement("div")
            const card = document.createElement("div");
            const img = document.createElement("img");
            const body = document.createElement("div");
            const title = document.createElement("h5");
            const desc = document.createElement("p");
            const preco = document.createElement("p");
            const comprar = document.createElement("a");

            card.classList.add("card");
            img.classList.add("card-ing-top");
            body.classList.add("card-body", "text-center");
            title.classList.add("card-title");
            desc.classList.add("card-text");
            preco.classList.add("card-text", "fs-5");
            comprar.classList.add("btn", "btn-primary");
            div.classList.add("col-12", "col-lg-4")

            img.setAttribute("src", produto.img1);
            title.textContent = produto.nome;
            desc.textContent = produto.desc;
            preco.textContent = (produto.preco / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
            comprar.setAttribute("href", produto.link);
            comprar.textContent = "Comprar"; // opcional

            body.appendChild(title);
            body.appendChild(desc);
            body.appendChild(preco);
            body.appendChild(comprar);
            card.appendChild(img);
            card.appendChild(body);

            div.appendChild(card)
            container.appendChild(div);
        }
    }

    getProductById(id: number): produto {
        const produto = this.productList.find(p => p.id === id);
        if (!produto) throw new Error("Produto não encontrado");
        return produto;
    }
}

export class ProductClass {
    repo: ProductManage
    constructor(repo: ProductManage) {
        this.repo = repo
    }

    getProductById(id: number) {
        return this.repo.getProductById(id)
    }

    generateProduct() {
        this.repo.generateProduct()
    }
}