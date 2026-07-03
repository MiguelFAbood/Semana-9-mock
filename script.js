const data = {
    produtos: [
        { id: 1, nome: "Smartphone Pro", preco: 2999.90, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Smartphone com câmera de 108MP.", emEstoque: true },
        { id: 2, nome: "Notebook Gamer", preco: 5500.00, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Notebook potente com placa de vídeo dedicada.", emEstoque: true },
        { id: 3, nome: "Teclado Mecânico", preco: 350.00, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Teclado RGB com switches azuis.", emEstoque: false },
        { id: 4, nome: "Mouse Sem Fio", preco: 120.50, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Mouse ergonômico com bateria de longa duração.", emEstoque: true },
        { id: 5, nome: "Console NextGen", preco: 4200.00, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console de última geração com suporte a 4K.", emEstoque: true },
        { id: 6, nome: "Jogo RPG Épico", preco: 250.00, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Mundo aberto com mais de 100 horas de gameplay.", emEstoque: false },
        { id: 7, nome: "Monitor Ultrawide", preco: 1800.00, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Monitor 29 polegadas para maior produtividade.", emEstoque: true },
        { id: 8, nome: "Smartwatch Fit", preco: 600.00, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Relógio inteligente com monitoramento cardíaco.", emEstoque: true }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.setAttribute("data-id", produto.id);
    card.classList.add("card");
    card.style.backgroundColor = "#ffffff";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3 class="card-title">${produto.nome}</h3>
        <p>${produto.categoria}</p>
        <p><strong>${formatPrice(produto.preco)}</strong></p>
        <button class="btn-details">Ver detalhes</button>
        <button class="btn-highlight">Destacar</button>
    `;

    const btnDetails = card.querySelector(".btn-details");
    btnDetails.addEventListener("click", () => showProductDetails(produto));

    const btnHighlight = card.querySelector(".btn-highlight");
    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    
    produtos.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    const renderedCards = document.querySelectorAll(".card");
    renderedCards.forEach(card => {
        console.log(`Card renderizado: Produto ID ${card.getAttribute("data-id")}`);
    });
}

function renderCategories() {
    const categorias = [...new Set(data.produtos.map(produto => produto.categoria))];
    
    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${produto.emEstoque ? "Em Estoque" : "Fora de Estoque"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filtered = data.produtos.filter(produto => {
        const matchesName = produto.nome.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "Todas" || produto.categoria === selectedCategory;
        return matchesName && matchesCategory;
    });

    renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
btnRender.addEventListener("click", () => renderProducts(data.produtos));

renderCategories();
renderProducts(data.produtos);