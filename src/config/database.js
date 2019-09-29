/* Error: ER_NOT_SUPPORTED_AUTH_MODE: The cause of error is that 
   you use too new  MySQL database (version >= 8.x). Old  MySQL versions (5.x) use 
   the authentication plugin such as  SHA256_PASSWORD. The  MySQL 8.x version uses the 
   authentication plugin such as SHA2_PASSWORD.  NodeJS MySQL library hasn't changed yet. 
   It uses the authentication plugin such as SHA256_PASSWORD, and has not supported  SHA2_PASSWORD.
*/

//To correct, type the command prompt the following instructions:
//1 - docker exec -it <mysql_name> bash -l
//2 - mysql -u root -p -h localhost
//3 - ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';

const mysql = require('mysql');

/*const connection = mysql.createConnection(
    'mysql://root:root@0.0.0.0:3306/timodb?charset=utf8_general_ci&timezone=-0700'
);*/

const connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST || 'localhost',
    user     : 'root',
    password : 'root',
    database : 'timodb'
});

connection.connect((err) => {
    if(!err){
        console.log("Connected")
    }else{
        console.log("Connection Failed", err)
    }
});

module.exports = connection;