const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());


const products = [
  {
    name: "Téléphone",
    description: "Téléphone tactile 10 pouces ",
    imageUrl: "../images/smartphone.png",
    price: 1000.99
  },
  {
    name: "Ordinateur portable",
    description: "Ordinateur portable 15 pouces",
    imageUrl: "../images/ordi.png",
    price: 799.99
  },
  {
    name: "Casque",
    description: "Casque sans fil Bluetouth",
    imageUrl: "../images/casque.png",
    price: 100.99
  },
  {
    name: "Montre",
    description: "Montre connectée noire",
    imageUrl: "../images/montre.png",
    price: 300.99
  },
  {
    name: "Tablette",
    description: "Tablette tactile dernière génération",
    imageUrl: "../images/tablette.png",
    price: 459.99
  },
  {
    name: "Souris",
    description: "Souris filaire",
    imageUrl: "../images/souris.png",
    price: 30.90
  }
];


app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Product service running at http://localhost:${PORT}`);
});
