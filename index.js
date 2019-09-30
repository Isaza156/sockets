const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public'))); // archivos que no interactuan con el backend, no envian ni reciben información.

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});