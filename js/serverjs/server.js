// 连接到数据库
const db = require('./datastorage.js');

const express = require('express');
const app = express();
const port = 3000;
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const videoStream = require('./videoStream.js');

var server = {
    // 连接到数据库
    connectToDB: () => {
        return new Promise((resolve, reject) => {
            // 调用connect函数
            db.connect()
                // 处理从datastorage.js返回的数据库连接的Promise的解析函数。
                .then(
                    () => {
                        // 调用datastorage.js中initialize()函数初始化数据库。
                        db.initialize();
                        resolve("Connected to MongoDB");
                    }
                )
                // 处理从datastorage.js返回的数据库连接的Promise中的拒绝函数。
                .catch(
                    (reason) => {
                        reject(reason);
                    }
                );
        });
    },
    getApp: () => {
        return app;
    },
    getDB: () => {
        return db;
    },
    getSocketIO: () => {
        return io;
    },
    startServer: () => {
        const externalRoutes = require('./routes.js');
        app.use('/', externalRoutes);
        httpServer.listen(port, () => {
            console.log('Server started on port ' + port);
        });
    }
}
module.exports = server;


