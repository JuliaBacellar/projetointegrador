// Get the orders from local storage
// Get the orders from local storage
import '../node_modules/xlsx/xlsx.js';
let orders = JSON.parse(localStorage.getItem("pedidos"));

// Function to display the orders
function displayOrders() {
  // Check if orders is defined and has a value
  if (orders && orders.length > 0) {
    // Get the order list element
    let orderList = document.getElementById("order-list");

    // Create the order list HTML
    let orderListHtml = "";

    // Loop through each order
    orders.forEach((order, index) => {
      orderListHtml += `
            <li class="order-card">
              <h3>Pedido: ${order.id}</h3>
              <p>Endereço:</p>
              <ul>
              <li>Cliente: ${order.address.name} ${order.address.surname}</li>
                <li>Rua: ${order.address.address},${order.address.address_2}</li>

                <li>Cidade: ${order.address.city}</li>
                <li>UF: ${order.address.UF}</li>
                <li>CEP: ${order.address.zip}</li>
              </ul>
              <p>Itens:</p>
              <ul>
          `;

      // Loop through each item
      order.items.forEach((item) => {
        orderListHtml += `
              <li>
                <p>
                  Codigo Produto: ${item.codigoProduto}
                </p>
              </li>
              <li>
                <p>
                  Produto: ${item.tituloProduto}
                </p>
              </li>
                
               <li>
                <p>
                  Quantidade: ${item.quantity}
                </p>
              </li>
              <li>
                <p>Preço: R$ ${item.preco}</p>
              </li>
            `;
      });

      orderListHtml += `
              </ul>
              <p>Valor Total do Pedido: R$ ${order.totalValue}</p>
            </li>
          `;
    });

    // Set the innerHTML of the order list element
    orderList.innerHTML = orderListHtml;
  } else {
    console.log("No orders found");
  }
}

// Call the displayOrders function
displayOrders();

function exportToExcel() {
  // Get the orders from localStorage
  const pedidos = JSON.parse(localStorage.getItem("pedidos"));

  // Create a new workbook and worksheet
  console.log(XLSX);
  const workbook = XLSX.utils.book_new();


  const worksheet = XLSX.utils.aoa_to_sheet([
    // Header row
    ["ID", "E-mail", "Name", "Surname", "Phone", "CPF", "Address", "Zip", "Number", "Address 2", "Neighborhood", "City", "UF", "Item Code", "Item Title", "Item Price", "Item Description", "Item Category", "Item Classification", "Item Home Display", "Item Quantity", "Total Value"],
    // Data rows
    ...pedidos.flatMap((pedido) => {
      // Create rows for each item in the order
      return pedido.items.map((item) => [
        pedido.id,
        pedido.address["e-mail"],
        pedido.address.name,
        pedido.address.surname,
        pedido.address.phone,
        pedido.address.CPF,
        pedido.address.address,
        pedido.address.zip,
        pedido.address.number,
        pedido.address.address_2,
        pedido.address.neighborhood,
        pedido.address.city,
        pedido.address.UF,
        item.codigoProduto,
        item.tituloProduto,
        item.preco,
        item.descricao,
        // item.imagemProduto.img1,
        // item.imagemProduto.img2,
        // item.imagemProduto.img3,
        // item.imagemProduto.img4,
        item.categoriaProduto,
        item.classificacaoProduto,
        item.exibirHome,
        item.quantity,
        pedido.totalValue,
      ]);
    }),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  // Generate the Excel file
  XLSX.writeFile(workbook, "orders.xlsx");
}

// Add an event listener to the button
const exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", exportToExcel);
