const server = require('./server.js');
var db = server.getDB();

var plantManagement = {
    getAllPlants: () => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getAllPlants()
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
    getPlantById: (plantId) => {
        return new Promise((resolve, reject) => {
            // 调用getAllPlants函数
            db.getPlantById(plantId)
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
    plantInfoAdd: (data) => {
        return new Promise((resolve, reject) => {
            // 调用ganimalAdd函数
            db.plantInfoAdd(data)
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
    plantImageInfoAdd: (id) => {
        return new Promise((resolve, reject) => {
            // 调用ganimalAdd函数
            db.plantImageInfoAdd(id)
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
    plantSearch: (searchTxt) => {
        return new Promise((resolve, reject) => {
            // 调用animalSearch函数
            db.plantSearch(searchTxt)
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
    plantInfoUpdate: (data) => {
        return new Promise((resolve, reject) => {
            // 调用plantInfoUpdate函数
            db.plantInfoUpdate(data)
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
    plantDelete: (id) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.plantDelete(id)
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
    plantAdopte: (data) => {
        return new Promise((resolve, reject) => {
            // 调用plantAdopte函数
            db.plantAdopte(data)
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
    plantCommentAdd: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.plantCommentAdd(data)
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

module.exports = plantManagement;