const express = require('express');
const app = express();
const PORT = 3000;
const productRoutes = require("./product-api/routes/productRoutes.js")

app.use(express.json());
app.use("/api/v1", productRoutes)

// Start server
app.listen(PORT, () => {

          console.log(`🚀 Server is running at http://localhost:${PORT}`);

});