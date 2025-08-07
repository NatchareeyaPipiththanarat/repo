const express = require("express");
const app = express()
const PORT = 3000;

const productRoutes = require('./routes/productRoutes');
const webRoutes = require('./routes/webRoutes');

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const path = require("path");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api', productRoutes);
app.use('/', webRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    console.log(`server running on http://localhost:${PORT}`);
    console.log(`API documentation is available at http://localhost:${PORT}/api-docs`)
});