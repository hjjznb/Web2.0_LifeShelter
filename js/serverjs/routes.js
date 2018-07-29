const bodyParser = require('body-parser');
const server = require('./server.js');
const fileUpload = require('express-fileupload');
const request = require('request');

const userManagement = require('./userManagement.js');
const animalManagement = require('./animalManagement.js');
const plantManagement = require('./plantManagement.js');
const roomManagement = require('./roomManagement.js');

const querystring = require('querystring');
const schedule = require('node-schedule');

var H2SFlag = false;
var TempFlag = false;
var led1Flag = false;
var led2Flag = false;
var led3Flag = false;
var led4Flag = false;
var led5Flag = false;

routes = function () {
    var externalRoutes = require('express').Router();
    var io = server.getSocketIO();

    externalRoutes.use(bodyParser.urlencoded({
        extended: true
    }));

    externalRoutes.use(fileUpload());

    externalRoutes.get('/css/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    externalRoutes.get('/js/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    externalRoutes.get('/images/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });
    
    externalRoutes.get('/others/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    externalRoutes.get('/', (req, res) => {
        res.sendFile("/views/login.html", {
            'root': './'
        });
    });

    externalRoutes.get('/index', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/index.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/index/:biology', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            const query = querystring.stringify({
                "biology": biology,
            });
            res.redirect('/index?' + query);
        }
    });

    externalRoutes.get('/room', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/room.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/room/:action', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var action = req.params.action;
            const query = querystring.stringify({
                "action": action,
            });
            res.redirect('/room?' + query);
        }
    });

    externalRoutes.get('/searchwiki', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/searchwiki.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/searchwiki/:biology/:id/:variety', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            var id = req.params.id;
            var variety = req.params.variety;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology,
                "id": id,
                "variety": variety,
            });
            res.redirect('/searchwiki?' + query);
        }
    });

    externalRoutes.get('/register', (req, res) => {
        res.sendFile("/views/register.html", {
            'root': './'
        });
    });

    externalRoutes.get('/userProfile', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/userProfile.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemCheck', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/itemCheck.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemCheck/:biology/:id', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            var id = req.params.id;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology,
                "id": id
            });
            res.redirect('/itemCheck?' + query);
        }
    });

    externalRoutes.get('/itemAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/itemAdd.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemAdd/:biology', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology
            });
            res.redirect('/itemAdd?' + query);
        }
    });

    externalRoutes.get('/itemUpdate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/itemUpdate.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemUpdate/:biology/:id', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            var id = req.params.id;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology,
                "id": id
            });
            res.redirect('/itemUpdate?' + query);
        }
    });

    externalRoutes.get('/userPassword', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/userPassword.html", {
                'root': './'
            });
        }
    });

    externalRoutes.post('/register', (req, res) => {
        var data = req.body;
        userManagement.addUser(data)
            .then(
                (data) => {
                    // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                    res.status(200).send(data);
                })
            .catch(
                (err) => {
                    // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                    res.status(500).send(err);
                }
            );
    });

    externalRoutes.post('/login', (req, res) => {
        var data = req.body;
        userManagement.searchUser(data)
            .then(
                (data) => {
                    // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                    res.status(200).send(data);
                })
            .catch(
                (err) => {
                    // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                    res.status(500).send(err);
                }
            );
    });

    externalRoutes.post('/getUserById', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var userId = req.body.userId;
            userManagement.getUserById(userId)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/userUpdate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.userUpdate(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/userPassword', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.userPassword(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/donate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.donate(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/adopte', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.adopte(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAllAnimals', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            animalManagement.getAllAnimals()
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );     
        }
    });

    externalRoutes.post('/getAnimalById', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var animalId = req.body.animalId;
            animalManagement.getAnimalById(animalId)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalInfoAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
        var data = req.body;
            animalManagement.animalInfoAdd(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalImageInfoAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            animalManagement.animalImageInfoAdd(id)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalImageAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.animalImage;
                var filename = req.body.animalId;

                file.mv("./images/animal/" + filename + ".jpg", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).redirect('/index/animal');
                    }
                });
            }
        }
    });

    externalRoutes.post('/animalSearch', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var searchTxt = req.body.name;
            animalManagement.animalSearch(searchTxt)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalInfoUpdate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            animalManagement.animalInfoUpdate(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalImageUpdate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.animalImage;
                var filename = req.body.animalId;

                if (typeof (file) != "undefined") {
                    file.mv("./images/animal/" + filename + ".jpg", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).redirect('/itemUpdate/animal/' + filename);
                        }
                    });
                } else {
                    res.status(200).redirect('/itemUpdate/animal/' + filename);
                }
            }
        }
    });

    externalRoutes.post('/animalDelete', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            const fs = require('fs');

            try {
                fs.unlinkSync("./images/animal/" + id + ".jpg");
                animalManagement.animalDelete(id)
                    .then(
                        (data) => {
                            roomManagement.roomStatusToAvailable(data.roomNumber)
                                .then(
                                    (data) => {
                                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                                        res.status(200).redirect('/index/animal');
                                    })
                                .catch(
                                    (err) => {
                                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                                        res.status(500).send(err);
                                    }
                                );
                        })
                    .catch(
                        (err) => {
                            // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                            res.status(500).send(err);
                        }
                    );
            } catch (err) {
                console.log(err);
                res.status(200).redirect('/index');
            }
        }
    });

    externalRoutes.post('/animalAdopte', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            animalManagement.animalAdopte(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).redirect('/index/animal');
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalCommentAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            animalManagement.animalCommentAdd(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAllPlants', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            plantManagement.getAllPlants()
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getPlantById', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var plantId = req.body.plantId;
            plantManagement.getPlantById(plantId)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantInfoAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantInfoAdd(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantImageInfoAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            plantManagement.plantImageInfoAdd(id)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantImageAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.plantImage;
                var filename = req.body.plantId;

                file.mv("./images/plant/" + filename + ".jpg", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).redirect('/index/plant');
                    }
                });
            }
        }
    });

    externalRoutes.post('/plantSearch', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var searchTxt = req.body.name;
            plantManagement.plantSearch(searchTxt)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantInfoUpdate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantInfoUpdate(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantImageUpdate', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.plantImage;
                var filename = req.body.plantId;

                if (typeof (file) != "undefined") {
                    file.mv("./images/plant/" + filename + ".jpg", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).redirect('/itemUpdate/plant/' + filename);
                        }
                    });
                } else {
                    res.status(200).redirect('/itemUpdate/plant/' + filename);
                }
            }
        }
    });

    externalRoutes.post('/plantDelete', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            const fs = require('fs');

            try {
                fs.unlinkSync("./images/plant/" + id + ".jpg");
                plantManagement.plantDelete(id)
                    .then(
                        (data) => {
                            roomManagement.roomStatusToAvailable(data.roomNumber)
                                .then(
                                    (data) => {
                                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                                        res.status(200).redirect('/index/plant');
                                    })
                                .catch(
                                    (err) => {
                                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                                        res.status(500).send(err);
                                    }
                                );
                        })
                    .catch(
                        (err) => {
                            // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                            res.status(500).send(err);
                        }
                    );
            } catch (err) {
                console.log(err);
                res.status(200).redirect('/index');
            }
        }
    });

    externalRoutes.post('/plantAdopte', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantAdopte(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).redirect('/index/plant');
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantCommentAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantCommentAdd(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAllRooms', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getAllRooms()
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAvailableRooms', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getAvailableRooms()
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAnimalAvailableRooms', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getAnimalAvailableRooms()
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getPlantAvailableRooms', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getPlantAvailableRooms()
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    externalRoutes.post('/getRoomByRoomNumber', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            roomManagement.getRoomByRoomNumber(roomNumber)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomInfoAdd', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            roomManagement.roomInfoAdd(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomStatusToOccupied', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            roomManagement.roomStatusToOccupied(roomNumber)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomStatusToAvailable', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            roomManagement.roomStatusToAvailable(roomNumber)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomDelete', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.getRoomNumber;
            console.log(roomNumber);
            roomManagement.roomDelete(roomNumber)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).redirect('/room/deleteRoom');
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    externalRoutes.post('/roomCurrentLocation', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            roomManagement.roomCurrentLocation(data)
                .then(
                    (data) => {
                        // 如果状态码是200，表示上传成功，并且返回一段data串到客户端
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        // 如果状态码是500，表示上传失败，并且返回失败的信息到客户端
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    // 打地鼠
    externalRoutes.post('/setServo1Up', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole1_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo1Down', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole1_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo2Up', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole2_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo2Down', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole2_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo3Up', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole3_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo3Down', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole3_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo4Up', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole4_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo4Down', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/WAMole4_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });

    externalRoutes.post('/logout', (req, res) => {
        userManagement.logout();
        res.status(200).redirect('/');
    });

    // 把读取的温度和湿度记录在数据库
//    var setTimer1 = new schedule.RecurrenceRule();
//    setTimer1.second = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];
//    schedule.scheduleJob(setTimer1, function () {
//        // Add Temperature and Humidity
//        request.get("http://192.168.240.1/arduino/analog/temperature_humidity/0", function (err, respone, body) {
//            if (!err && respone.statusCode == 200) {
//                if(body.indexOf("temperature") != -1 && body.indexOf("humidity") != -1) {
//                    var body = JSON.parse(body);
//                    roomManagement.roomAddTemperatureAndHumidity(body)
//                        .then(
//                            (data) => {
//                                // console.log("add");
//                            })
//                        .catch(
//                            (err) => {
//                                console.log(err);
//                            }
//                        );
//                }
//
//            } else {
//                console.log(err);
//            }
//        });
//    });
    
    // 把数据库的温度和湿度记录清除
//    var setTimer2 = new schedule.RecurrenceRule();
//    setTimer2.minute = [0, 10, 20, 30, 40, 50];
//    schedule.scheduleJob(setTimer2, function () {
//        // Delete Temperature and Humidity (/0必须存在)
//        request.get("http://192.168.240.1/arduino/analog/temperature_humidity/0", function (err, respone, body) {
//            if (!err && respone.statusCode == 200) {
//                if(body.indexOf("temperature") != -1 && body.indexOf("humidity") != -1) {
//                    var body = JSON.parse(body);
//                    roomManagement.roomDeleteTemperatureAndHumidity(body)
//                        .then(
//                            (data) => {
//                                // console.log("delete");
//                            })
//                        .catch(
//                            (err) => {
//                                console.log(err);
//                            }
//                        );
//                }
//
//            } else {
//                console.log(err);
//            }
//        });
//    });
    
    // 获取实时温度和湿度记录
    externalRoutes.post('/getRealTimeTemperatureAndHumidity', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            // get Temperature and Humidity (/0必须存在)
            request.get("http://192.168.240.1/arduino/analog/temperature_humidity/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("temperature") != -1 && body.indexOf("humidity") != -1) {
                        var data = JSON.parse(body);
                        res.status(200).send(data);
                        if(data.temperature > 30){
                            request.get("http://192.168.240.1/arduino/digital/fan_on/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                TempFlag = true;
                                console.log("aaa");
                                request.get("http://192.168.240.1/arduino/digital/led1/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {
                                    led1Flag = true;
                                } else {
                                    console.log(err);
                                }
                                });
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else if(data.temperature < 20) {
                            request.get("http://192.168.240.1/arduino/digital/led1/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                led1Flag = true;
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else if(data.humidity < 30) {
                            request.get("http://192.168.240.1/arduino/digital/led1/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                led1Flag = true;
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else if(data.humidity > 70) {
                            request.get("http://192.168.240.1/arduino/digital/led1/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                led1Flag = true;
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else {
                            led1Flag = false;
                            if(H2SFlag == false && TempFlag == false) {
                                request.get("http://192.168.240.1/arduino/digital/fan_off/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {

                                } else {
                                    console.log(err);
                                }
                                });
                            }
                        }
                    }
                } else {
                    console.log(err);
                }
            });
        }
    });
    
    // 实时获取H2S记录
    externalRoutes.post('/getRealTimeH2S', (req, res) => {
        if (!userManagement.isLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://192.168.240.1/arduino/analog/h2s/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("h2s") != -1) {
                        var data = JSON.parse(body);
                        res.status(200).send(data);
                        if(data.h2s > 120){
                            request.get("http://192.168.240.1/arduino/digital/fan_on/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                H2SFlag = true;
                                request.get("http://192.168.240.1/arduino/digital/led3/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {
                                    led1Flag = true;
                                } else {
                                    console.log(err);
                                }
                                });
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else {
                            if(H2SFlag == false && TempFlag == false) {
                                request.get("http://192.168.240.1/arduino/digital/fan_off/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {

                                } else {
                                    console.log(err);
                                }
                                });
                            }
                        }
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    // 把读取的H2S记录在数据库
//    var setTimer3 = new schedule.RecurrenceRule();
//    setTimer3.second = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];
//    schedule.scheduleJob(setTimer3, function () {
//        // Update H2S
//        request.get("http://192.168.240.1/arduino/analog/h2s/0", function (err, respone, body) {
//            if (!err && respone.statusCode == 200) {
//                if(body.indexOf("h2s") != -1) {
//                    var body = JSON.parse(body);
//                    roomManagement.roomUpdateH2S(body)
//                        .then(
//                            (data) => {
//                                // console.log("update");
//                            })
//                        .catch(
//                            (err) => {
//                                console.log(err);
//                            }
//                        );
//                }
//
//            } else {
//                console.log(err);
//            }
//        });
//    });
    
    // 从数据库中读取的H2S记录
    var setTimer4 = new schedule.RecurrenceRule();
    setTimer4.second = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57];
    schedule.scheduleJob(setTimer4, function () {
        var roomNumber = 1;
        roomManagement.getRoomByRoomNumber(roomNumber)
            .then(
                (data) => {
                    if(data[0].h2s > 120) {
//                        console.log("1_on");
//                        request.get("http://192.168.240.1/arduino/analog/catlitterbox1_on/0", function (err1_on, respone1_on, body1_on) {
//                        if (!err1_on && respone1_on.statusCode == 200) {
//                            console.log("1_on");
//                            setTimeout(function(){
//                            request.get("http://192.168.240.1/arduino/analog/catlitterbox2_on/0", function (err2_on, respone2_on, body2_on) {
//                            if (!err2_on && respone2_on.statusCode == 200) {
//                                console.log("2_on");
//                                setTimeout(function(){
//                                request.get("http://192.168.240.1/arduino/analog/catlitterbox2_off/0", function (err2_off, respone2_off, body2_off) {
//                                if (!err2_off && respone2_off.statusCode == 200) {
//                                    console.log("2_off");
//                                    setTimeout(function(){
//                                    request.get("http://192.168.240.1/arduino/analog/catlitterbox1_off/0", function (err1_off, respone1_off, body1_off) {
//                                    if (!err1_off && respone1_off.statusCode == 200) {
//                                        console.log("1_off");
//                                        setTimeout(function(){
//                                        request.get("http://192.168.240.1/arduino/analog/catlitterbox3_on/0", function (err3_on, respone3_on, body3_on) {
//                                            console.log("311on");
//                                        if (!err3_on && respone3_on.statusCode == 200) {
//                                            console.log("3_on");
//                                            setTimeout(function(){
//                                            request.get("http://192.168.240.1/arduino/analog/catlitterbox3_off/0", function (err3_off, respone3_off, body3_off) {
//                                            if (!err3_off && respone3_off.statusCode == 200) {
//                                                console.log("3_off");
//                                                setTimeout(function(){
//                                                request.get("http://192.168.240.1/arduino/analog/sprinkler_on/0", function (err4_on, respone4_on, body4_on) {
//                                                if (!err4_on && respone4_on.statusCode == 200) {
//                                                    console.log("sprinkler_on");
//                                                    setTimeout(function(){
//                                                    request.get("http://192.168.240.1/arduino/analog/sprinkler_off/0", function (err5_off, respone5_off, body5_off) {
//                                                    if (!err5_off && respone5_off.statusCode == 200) {
//                                                        console.log("sprinkler_catlitterbox");
//                                                    }
//                                                    })
//                                                    },2000);
//                                                }
//                                                })
//                                                },2000);
//                                            }
//                                            })
//                                            },5000);
//                                        }
//                                        })
//                                        },3000);
//                                    }
//                                    })
//                                    },2000);
//                                }
//                                else {
//                                    console.log(err);
//                                }
//                                });
//                                },10000);
//                            }
//                            else {
//                                console.log(err);
//                            }
//                            });
//                            },2000);
//                        }
//                        })
                    }
                })
            .catch(
                (err) => {
                    console.log(err);
                }
            );
    });
    
    // 每天12点和18点读取食物 
//    var setTimer5 = new schedule.RecurrenceRule();
//    setTimer5.second = [0];
//    schedule.scheduleJob(setTimer5, function () {
//        // 检测食物是否已经吃完
//        request.get("http://192.168.240.1/arduino/analog/food_light_sensor/0", function (err, respone, body) {
//            if (!err && respone.statusCode == 200) {
//                var body = JSON.parse(body);
//                console.log(body);
//                if(body.food_light_sensor < 300) {
//                    request.get("http://192.168.240.1/arduino/digital/led2/0", function (err, respone, body) {
//                        if (!err && respone.statusCode == 200) {
//                            led2Flag = true;
//                        } else {
//                            console.log(err);
//                        }
//                    });
//                }
//                else {
//                    // 开启开关
//                    request.get("http://192.168.240.1/arduino/analog/food_servo_on/0", function (err, respone, body) {
//                        if (!err && respone.statusCode == 200) {
//                            var count = 0;
//                            var interval = setInterval(function () {
//                                // 检测食物是否装满
//                                request.get("http://192.168.240.1/arduino/analog/food_light_sensor/0", function (err, respone, body) {
//                                    if (!err && respone.statusCode == 200) {
//                                        var body = JSON.parse(body);
//                                        if(body.food_light_sensor < 100) {
//                                            // 关闭开关
//                                            request.get("http://192.168.240.1/arduino/analog/food_servo_off/0", function (err, respone, body) {
//                                                if (!err && respone.statusCode == 200) {
//                                                    console.log(body);
//                                                    clearInterval(interval);
//                                                } else {
//                                                    console.log(err);
//                                                }
//                                            });
//                                        }
//                                        console.log(body);
//                                    } else {
//                                        console.log(err);
//                                    }
//                                });
//                                count++;
//                                console.log("food_light_sensor " + count);
//                                if(count == 30) {
//                                    clearInterval(interval);
//                                }
//                            }, 1000);
//                            
//                        } else {
//                            console.log(err);
//                        }
//                    }); 
//                }
//            } else {
//                console.log(err);
//            }
//        });
//    });
    
    // 每天12点和18点读取水位
//    var setTimer6 = new schedule.RecurrenceRule();
//    setTimer6.second = [0];
//    schedule.scheduleJob(setTimer6, function () {
//        // 检测食物是否已经吃完
//        request.get("http://192.168.240.1/arduino/analog/water_level_sensor/0", function (err, respone, body) {
//            if (!err && respone.statusCode == 200) {
//                var body = JSON.parse(body);
//                console.log(body);
//                if(body.water_level_sensor > 600) {
//                    request.get("http://192.168.240.1/arduino/digital/led2/0", function (err, respone, body) {
//                        if (!err && respone.statusCode == 200) {
//                            led2Flag = true;
//                        } else {
//                            console.log(err);
//                        }
//                    });
//                }
//                else {
//                    // 开启开关
//                    request.get("http://192.168.240.1/arduino/analog/pump_on/0", function (err, respone, body) {
//                        if (!err && respone.statusCode == 200) {
//                            var count = 0;
//                            var interval = setInterval(function () {
//                                // 检测食物是否装满
//                                request.get("http://192.168.240.1/arduino/analog/water_level_sensor/0", function (err, respone, body) {
//                                    if (!err && respone.statusCode == 200) {
//                                        var body = JSON.parse(body);
//                                        if(body.water_level_sensor >1000) {
//                                            // 关闭开关
//                                            request.get("http://192.168.240.1/arduino/analog/pump_off/0", function (err, respone, body) {
//                                                if (!err && respone.statusCode == 200) {
//                                                    console.log(body);
//                                                    clearInterval(interval);
//                                                } else {
//                                                    console.log(err);
//                                                }
//                                            });
//                                        }
//                                        console.log(body);
//                                    } else {
//                                        console.log(err);
//                                    }
//                                });
//                                count++;
//                                console.log("water_level_sensor " + count);
//                                if(count == 30) {
//                                    clearInterval(interval);
//                                }
//                            }, 1000);
//                            
//                        } else {
//                            console.log(err);
//                        }
//                    }); 
//                }
//            } else {
//                console.log(err);
//            }
//        });
//    });

    // 正常
//    var setTimerNormal = new schedule.RecurrenceRule();
//    setTimerNormal.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
//    schedule.scheduleJob(setTimerNormal, function () {
//        if(led1Flag == false && led2Flag == false && led3Flag == false && led4Flag == false && led5Flag == false) {
//            request.get("http://192.168.240.1/arduino/digital/led6/0", function (err, respone, body) {
//                if (!err && respone.statusCode == 200) {
//
//                } else {
//                    console.log(err);
//                }
//            });
//        }
//    });
    
    return externalRoutes;
};

module.exports = routes();