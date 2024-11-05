
import { database } from "./database.js";
import { getProdId, loadProducts} from "./functions.js";

// -------- Variaveis do projeto ------------------------
const sectionProducts = document.querySelector(".section-product-grid")
//Fitros
//Funçoes com parametros
loadProducts(database,sectionProducts);

getProdId()
