export function loadProducts(productList, load) {
  /* carrega os produtos na home e na pagina de prododus*/

  productList.forEach((produto) => {
    const valParcela = (produto.preco / 10).toFixed(2);
    const html = `<div class="product-card idprod" id="${produto.codigoProduto}">
        <div>
          <img id="${produto.codigoProduto}"
            src="${produto.imagemProduto.img1}"
            alt="${produto.tituloProduto}"
          />
        </div>
        <div class="product-card-info-container">

          <h2 class="product-card-title" title="${produto.tituloProduto}">
          ${produto.tituloProduto}
          </h2>
          
          <h4 class="product-card-reference">Cod. ${produto.codigoProduto}</h4>
          <h3 class="product-card-price">R$ ${produto.preco.toFixed(2)}</h3>
          <h4 class="product-card-installment">
            10x de R$ ${valParcela} s/juros
          </h4>
        </div>
        <a href="./product.html">
        <button id="${produto.codigoProduto}" class="product-card-btn">COMPRAR</button>
        </a>
      </div>`;
    load.innerHTML += html;
  });
}

// captura o codigo/id do produto
export function getProdId(){
  let itens = document.querySelectorAll(".idprod")
  console.log(itens)
  itens.forEach(item => item.addEventListener('click',(evento)=>{
      let prodID = evento.target.id
      localStorage.setItem('prodId',prodID)
      
  }))
}

// localiza o produto na base de dados
export function findProduct(productList, productId){
  let produto = productList.find(produto => produto.codigoProduto == productId)
  return produto
}

//carrega o produto na pagina do produto

export function loadProduct(produto,selecaoProduto){

const productCategory = document.querySelector("#product-category");
productCategory.innerText = `${produto.categoriaProduto}`;

const productTitle = document.querySelector("#product-title")

productTitle.children[0].innerText = `COD: ${produto.codigoProduto}`
productTitle.children[1].innerText = `${produto.tituloProduto}`


 const HTML = `<div class="product_images_container">

 <div class="images_selector">

   <i class="bi bi-chevron-double-up"></i>
 <ul>
   <li><img src="${produto.imagemProduto.img1}" alt="" class="product_thumb"></li>
   <li><img src="${produto.imagemProduto.img2}"" alt="" class="product_thumb"></li>
   <li><img src="${produto.imagemProduto.img3}"" alt="" class="product_thumb"></li>
   <li><img src="${produto.imagemProduto.img4}"" alt="" class="product_thumb"></li>
 </ul>
 <i class="bi bi-chevron-double-down"></i>
 </div>
 <div class="images_main">
   <img src="${produto.imagemProduto.img1}" alt="">
 </div>
</div>


<div class="product_description_container">
 <h3 class="main-text">
   Descrição

 </h3>
 <p class="product_description">
   ${produto.descricao}
 </p>
</div>`
selecaoProduto.innerHTML = HTML

const price = document.querySelector(".product_price_container")
const parcela = (produto.preco/10).toFixed(2)
price.children[0].innerText = `R$ ${produto.preco.toFixed(2)}`
price.children[1].innerText = `Ou em ate 10x sem juros de R$ ${parcela} no cartão de credito`



}

function cartTotal(cartItens) {
  return cartItens.reduce((total, item) => total + item.preco * item.quantity, 0);
}


export function loadCartItem(cartItens,cartItensHTML){

  if(cartItens.length == [] || cartItens.length == [] ){
    cartItensHTML.innerHTML = `Seu carrinho está vazio`
  } else {
    cartItens.forEach(item => {  
      let html = `
      <div class="cart_item" id="${item.codigoProduto}">
                  <div class="cart_item_main_img">
                      <img src="${item.imagemProduto.img1}" alt="">
                  </div>
                  <div class="cart_item_info">
                      <p>${item.tituloProduto}</p>
                      <p>
                          R$ ${item.preco}
                          <span>Un.</span>
                      </p>
  
                      <h3>R$ ${(item.preco)*(item.quantity)}</h3>
                     <div class="cart_item_qtd_selector">
                      <div class="cart_item_qtd_selector_container">
                          <i class="bi bi-dash"></i>
                          <span>${item.quantity}</span>
                          <i class="bi bi-plus"></i>
                      </div>
                      <button id="${item.codigoProduto}" class="remove">remover</button>
                     </div>
                  </div>
              </div>
  `
  cartItensHTML.innerHTML += html
  })
  const total = cartTotal(cartItens);
  localStorage.setItem('totalValue', total);
  const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
  price.innerHTML = `R$ ${total.toFixed(2)}`}

  }
  


  export function removeCartItem(sacolaCompras) {
    let botaoDel = document.querySelectorAll("button.remove") /* remover produto do carrinho */
    let cartItens = document.querySelector(".grid_col_1")
    botaoDel.forEach(botao => botao.addEventListener('click', (event) => {
      let item = event.target.parentElement.parentElement.parentElement
      console.log(item)
      cartItens.removeChild(item)
      console.log(item.id)
      let index = sacolaCompras.findIndex(i => i.codigoProduto == item.id)
      console.log(index)
      sacolaCompras.splice(index, 1)
      console.log(sacolaCompras)
      localStorage.setItem('listaCompras', JSON.stringify(sacolaCompras))
  
      // Update the price element here
      const total = cartTotal(sacolaCompras);
      localStorage.setItem('totalValue', total);
      const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
      price.innerHTML = `R$ ${total.toFixed(2)}`;
     
    }));
  }


export function shop(pedidos){

const form = document.querySelector('#billing form');
const inputs = form.querySelectorAll('input,select');
const inputValues = {};
inputs.forEach((input) => {
  if (input.type!== 'submit' && input.type!== 'button') {
    inputValues[input.name] = input.value;
  }
});
console.log(inputValues);
const order = {
   id: pedidos.length > 0? pedidos[pedidos.length - 1].id + 1 : 1,
   address:{...inputValues},
   items: JSON.parse(localStorage.getItem("listaCompras")),
   totalValue: parseFloat(localStorage.getItem("totalValue"))
};

pedidos.push(order);
localStorage.setItem("pedidos", JSON.stringify(pedidos));;
alert("pedido realizado com sucesso")
localStorage.removeItem("listaCompras");
localStorage.removeItem("totalValue");
window.location = "./index.html"
} 