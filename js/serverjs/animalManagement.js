const server = require('./server.js');
var db = server.getDB();

var animalManagement = {
    getAllAnimals: () => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.getAllAnimals()
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
    getAnimalById: (animalId) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.getAnimalById(animalId)
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
    animalInfoAdd: (data) => {
        return new Promise((resolve, reject) => {
            // 调用ganimalAdd函数
            db.animalInfoAdd(data)
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
    animalImageInfoAdd: (id) => {
        return new Promise((resolve, reject) => {
            // 调用ganimalAdd函数
            db.animalImageInfoAdd(id)
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
    animalSearch: (searchTxt) => {
        return new Promise((resolve, reject) => {
            // 调用animalSearch函数
            db.animalSearch(searchTxt)
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
    animalInfoUpdate: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.animalInfoUpdate(data)
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
    animalDelete: (id) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.animalDelete(id)
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
    animalAdopte: (data) => {
        return new Promise((resolve, reject) => {
            // 调用animalAdopte函数
            db.animalAdopte(data)
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
    animalCommentAdd: (data) => {
        return new Promise((resolve, reject) => {
            // 调用getAllAnimals函数
            db.animalCommentAdd(data)
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

module.exports = animalManagement;