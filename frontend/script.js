const productAPI = 'http://localhost:3001/products';
const orderAPI = 'http://localhost:3002/orders';

const productsDiv = document.getElementById('products');
const ordersDiv = document.getElementById('orders');

function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}


function clearOrders() {
  localStorage.setItem('orders', JSON.stringify([])); 
  renderOrders(); 
}

function clearAllOrders() {
  fetch(orderAPI + '/clear', { method: 'POST' })
    .then(res => {
      if (res.ok) {
        alert("Toutes les commandes ont été supprimées.");
        fetchOrders();
      } else {
        alert("Impossible de supprimer les commandes.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur réseau.");
    });
}


function renderOrders() {
  const container = document.getElementById('orders');
  container.innerHTML = '';
  
  if (orders.length === 0) {
    container.innerHTML = "<p>Aucune commande enregistrée.</p>";
  } else {
    orders.forEach((o, index) => {
      container.innerHTML += `
        <p>Commande ${index + 1}: <strong>${o.quantity}</strong> x ${o.productName} 
        <button onclick="deleteOrder(${index})">Supprimer</button></p>
      `;
    });
  }
}

let allProducts = [];

function fetchProducts() {
  fetch(productAPI)
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      displayProducts(allProducts);
    });
}

function displayProducts(products) {
  productsDiv.innerHTML = products.map(p => `
    <div class="product-card">
      <h3>${p.name}</h3>
       <img src="${p.imageUrl}" alt="${p.name}">
      <p>${p.description}</p>
      <strong>${p.price} €</strong>
      <button id="clearOrdersBtn" onclick="orderProduct('${p.name}', 1)">Commander</button>
    </div>
  `).join('');
}

function filterProducts() {
  const keyword = document.getElementById('searchBar').value.toLowerCase();
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(keyword));
  displayProducts(filtered);
}



function fetchOrders() {
  fetch(orderAPI)
    .then(res => res.json())
    .then(orders => {
      ordersDiv.innerHTML = orders.map(o =>
        `<p>Commande #${o.id} – ${o.quantity} x ${o.productName} – Client : ${o.clientEmail}</p>`
      ).join('');
    });
}


function orderProduct(productName, quantity) {
  console.log(`Envoi de la commande: ${productName}, quantité: ${quantity}`);
  const clientEmailInput = document.getElementById('clientEmail');
  const clientEmail = clientEmailInput ? clientEmailInput.value : "test@example.com";

  fetch(orderAPI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productName, quantity, clientEmail  })
  })
  .then(res => {
    if (!res.ok) {
      console.error("Erreur lors de la commande :", res.status); 
      alert(' Erreur lors de la commande.');   
    } else {
      alert(`Commande de ${quantity} x ${productName} pour ${clientEmail} passée avec succès !`);
    }
    return res.json();
  })
  .then(data => {
    console.log("Réponse de la commande :", data); 
    fetchOrders();  
  })
  .catch(err => {
    console.error("Erreur dans l'envoi de la commande :", err); 
  });
}

document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();  

  const productName = document.getElementById('productName').value;
  const quantity = document.getElementById('quantity').value;

  console.log(`Formulaire soumis : ${productName} - Quantité : ${quantity}`); 

  orderProduct(productName, quantity);
  e.target.reset();  
});


fetchProducts();
fetchOrders();

renderProducts();
renderOrders();
showTab('accueil');