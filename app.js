const express = require('express')
const app = express()
const transactions = require("./models/transactions");
const cors = require('cors')
app.use(cors())
app.use(express.json())

// INDEX
app.get("/", (req, res) => {
    res.json(transactions);
  });
  
  // SHOW
  app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );
  
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });
  
  // CREATE
  app.post("/", (req, res) => {
    const newTransaction = req.body;
    newTransaction.id = transactions.length; // Generate new ID
    transactions.push(newTransaction);
    res.status(201).json(newTransaction); // Return created transaction with ID
  });
  
  // DELETE
  app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = transactions.findIndex(
      (transaction) => transaction.id === id
    );
  
    if (index !== -1) {
      const deletedTransaction = transactions.splice(index, 1);
      res.status(200).json(deletedTransaction);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });
  
  // UPDATE
  app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTransaction = req.body;
    const index = transactions.findIndex(
      (transaction) => transaction.id === id
    );
  
    if (index !== -1) {
        transactions[index] = updatedTransaction;
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });

module.exports = app