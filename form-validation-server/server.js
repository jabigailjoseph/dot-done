const express = require('express');
const bodyParser = require('body-parser');
const validateForm = require('./validation');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email, password, age } = req.body;
    const errors = validateForm(name, email, password, age);

    let responseHTML = '';
    if (errors.length > 0) {
        responseHTML = errors.map(error => `<p class="error">${error}</p>`).join('');
    } else {
        responseHTML = '<p class="success">Form submitted successfully!</p>';
    }
    res.send(responseHTML);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
