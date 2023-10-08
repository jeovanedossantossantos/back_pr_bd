const db = require('../../connect')


db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE endereco (id INT AUTO_INCREMENT PRIMARY KEY,cidade VARCHAR(100) NOT NULL,bairro VARCHAR(50) NOT NULL,rua VARCHAR(100) NOT NULL,numero INT,UNIQUE (cidade, bairro, rua, numero))";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        return
    });
});