const server = require('./server.js');
var db = server.getDB();

var roomManagement = {
    getAllRooms: () => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getAllRooms()
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getAvailableRooms: () => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getAvailableRooms()
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getAnimalAvailableRooms: () => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getAnimalAvailableRooms()
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getPlantAvailableRooms: () => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getPlantAvailableRooms()
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getRoomByRoomNumber: (roomNumber) => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getRoomByRoomNumber(roomNumber)
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomInfoAdd: (data) => {
        return new Promise((resolve, reject) => {
            // 调用ganimalAdd函数
            db.roomInfoAdd(data)
                // 处理从datastorage.js的getAllAnimals返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllAnimals返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomStatusToOccupied: (roomNumber) => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.roomStatusToOccupied(roomNumber)
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomStatusToAvailable: (roomNumber) => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.roomStatusToAvailable(roomNumber)
                // 处理从datastorage.js的getAllPlants返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllPlants返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomDelete: (roomNumber) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.roomDelete(roomNumber)
                // 处理从datastorage.js的getAllAnimals返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllAnimals返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomAddTemperatureAndHumidity: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.roomAddTemperatureAndHumidity(data)
                // 处理从datastorage.js的getAllAnimals返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllAnimals返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomDeleteTemperatureAndHumidity: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.roomDeleteTemperatureAndHumidity(data)
                // 处理从datastorage.js的getAllAnimals返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllAnimals返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomUpdateH2S: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.roomUpdateH2S(data)
                // 处理从datastorage.js的getAllAnimals返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllAnimals返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    roomCurrentLocation: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.roomCurrentLocation(data)
                // 处理从datastorage.js的getAllAnimals返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getAllAnimals返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
};

module.exports = roomManagement;