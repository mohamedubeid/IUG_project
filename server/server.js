const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var loginUser = require('./routes/loginRoutes');
var categories = require('./routes/categoriesRoutes');
var users = require('./routes/userRoutes');
var cart = require('./routes/cartRoutes');

app.use('/api', loginUser);
app.use('/api', categories);
app.use('/api', users);
app.use('/api', cart);

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went rely wrong",
    });
});
// Listen on pc port
const PORT = process.env.PORT || 8877;
app.listen(PORT, () => console.log(`Server running sucessfully  on PORT ${PORT}`));
