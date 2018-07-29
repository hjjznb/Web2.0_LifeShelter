var server = require('./js/serverjs/server.js');
const io = server.getSocketIO();
server.startServer();

// 处理从server.js返回的服务器的connectToDB()的Promise中的解析和拒绝函数。
// 请注意在此示例中使用函数dbConnectionSuccess和函数errorHandler作为参数。
server.connectToDB()
    .then(dbConnectionSuccess)
    .catch(errorHandler);

function dbConnectionSuccess(message) {
    const userManagement = require('./js/serverjs/userManagement.js');
    io.on('connection', (socket) => {
        
    });
}

function errorHandler(err) {
    console.log(err);
}


