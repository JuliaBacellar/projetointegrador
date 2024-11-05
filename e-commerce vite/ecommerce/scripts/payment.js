import {shop} from "./functions.js";
let sacolaCompras = JSON.parse(localStorage.getItem("listaCompras")) 
let totalValue = parseFloat(localStorage.getItem("totalValue"));
console.log(totalValue)

const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
      price.innerHTML = `R$ ${totalValue.toFixed(2)}`;

let pedidos = JSON.parse(localStorage.getItem("pedidos"))
if (pedidos == null){ /* Criando uma lista de pedidos vazia*/
    pedidos = []
}

const shopBtn = document.querySelector("button.checkout_btn")
shopBtn.addEventListener("click",() => {
    shop(pedidos);
})