const express = require('express');
const cors = require('cors'); 
const app = express();
const fs = require('fs');
const PORT = 3002;
const path = require('path');

app.use(cors()); 
app.use(express.json());

let orders = [];

app.post('/orders', (req, res) => {
  const { productName, quantity, clientEmail } = req.body;
  const order = {
    id: orders.length + 1,
    productName,
    quantity,
    clientEmail
  };
  orders.push(order);
  res.status(201).json(order);
});


app.get('/orders', (req, res) => {
  res.json(orders);
});

const ordersFilePath = path.join(__dirname, 'orders.json');

app.use(express.json());

app.post('/orders/clear', (req, res) => {
  orders = [];
  res.status(200).send({ message: 'Toutes les commandes supprimées.' });
});



app.delete('/orders', (req, res) => {
  fs.writeFile(ordersFilePath, JSON.stringify([], null, 2), (err) => {
    if (err) {
      console.error('Erreur lors de la suppression des commandes:', err);
      return res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
    res.status(200).json({ message: 'Toutes les commandes ont été supprimées.' });
  });
});


app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
