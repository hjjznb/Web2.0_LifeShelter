const mongoose = require('mongoose');

// 声明一个schema
const schema = mongoose.Schema;

// 声明数据库表 
var userSchema = {};
var animalSchema = {};
var plantSchema = {};
var roomSchema = {};

// 声明一个集合collection
var UserModel;
var AnimalModel;
var PlantModel;
var RoomModel;

var database = {
    // 定义一个connect的函数用于连接数据库，并定义数据库名称
    connect: () => {
        // 这个命令返回一个Promise，当连接到数据库时将由服务器处理。
        return mongoose.connect('mongodb://localhost:27017/', {
            dbName: 'LifeKingdom'
        });
    },
    
    // 初始化操作
    initialize: () => {
        // 定义数据库表
        userSchema = schema({
            name: String,
            nric: String,
            password: String,
            phone: Number,
            email: String,
            address: String,
            income: Number,
            balance: Number,
            type: String,
            timeStamp: String
        });
        
        animalSchema = schema({
            name: String,
            type: String,
            variety: String,
            age: Number,
            gender: String,
            findingLocation: String,
            price: Number,
            isAdopted: Boolean,
            healthStatus: String,
            photoUrl: String,
            comment: [{
                userId: String,
                userName:String,
                userComment: String,
                timeStamp: String
            }],
            roomNumber: Number,
            timeStamp: String
        });
        
        plantSchema = schema({
            name: String,
            type: String,
            variety: String,
            age: Number,
            price: Number,
            isAdopted: Boolean,
            healthStatus: String,
            photoUrl: String,
            comment: [{
                userId: String,
                userName:String,
                userComment: String,
                timeStamp: String
            }],
            roomNumber: Number,
            timeStamp: String
        });
        
        roomSchema = schema({
            roomNumber: Number,
            biology: String,
            temperature: Array,
            humidity: Array,
            h2s: Number,
            latitude: Number,
            longitude: Number,
            currentLocation: String,
            status: String
        });
        
        //启动数据库连接
        var connection = mongoose.connection;
        
        //初始化数据库表
        UserModel = connection.model('user', userSchema);
        AnimalModel = connection.model('animal', animalSchema);
        PlantModel = connection.model('plant', plantSchema);
        RoomModel = connection.model('room', roomSchema);
    },
    
    // User
    // 调用addUser函数就是定义并插入一行数据document
    addUser: (name, nric, password, phone, email, address, income, balance, type) => {
        var newUser;
        if(type == "Customer"){
            // 定义一行即将插入的数据document
            newUser = new UserModel({
                name: name,
                nric: nric,
                password: password,
                phone: phone,
                email: email,
                address: address,
                income: income,
                balance: balance,
                type: type,
                timeStamp: Date.now()
            });
        }
        else {
            newUser = new UserModel({
                name: name,
                nric: nric,
                password: password,
                phone: phone,
                email: email,
                address: address,
                type: type,
                timeStamp: Date.now()
            });
        }
        // 插入一行数据document
        // 该函数返回一个来自于eventManagement.js中addUser的Promise。
        // 其中包含新添加的事件（如果已解决）或错误（如果已拒绝）。
        return newUser.save();
    },
    
    // User
    searchUser: (userinfo) => {
        return UserModel.findOne({email: userinfo.email, password: userinfo.password}).exec();
    },
    getUserById: (id) => {
        return UserModel.findById(id).exec();
    },
    userUpdate: (data) => {
        var userUpdate;
        if(data.type == "Customer") {
            userUpdate = {
                name: data.name,
                phone: data.phone,
                address: data.address,
                income: data.income,
                balance: data.balance
            };
        }
        else {
            userUpdate = {
                name: data.name,
                phone: data.phone,
                address: data.address
            };
        }

        // 根据ID更新信息
        return UserModel.findByIdAndUpdate(data.id, userUpdate).exec();
    },
    userPassword: (data) => {
        var userPassword = {
            password: data.newPassword
        };
        return UserModel.findByIdAndUpdate(data.userId, userPassword).exec();
    },
    donate: (data) => {
        var donate = {
            balance: data.newBalance
        };
        return UserModel.findByIdAndUpdate(data.userId, donate).exec();
    },
    adopte: (data) => {
        var adopte = {
            balance: data.newBalance
        };
        return UserModel.findByIdAndUpdate(data.userId, adopte).exec();
    },
    
    
    // Animal
    getAllAnimals: () => {
        return AnimalModel.find({}).exec();
    },
    getAnimalById: (id) => {
        return AnimalModel.findById(id).exec();
    },
    animalInfoAdd: (data) => {
        // 定义一行即将插入的数据document
        var newAnimal = new AnimalModel({
            name: data.name,
            type: data.type,
            variety: data.variety,
            age: data.age,
            gender: data.gender,
            findingLocation: data.findingLocation,
            price: data.price,
            isAdopted: data.isAdopted,
            healthStatus: data.healthStatus,
            photoUrl: "",
            roomNumber: data.roomNumber,
            timeStamp: Date.now()
        });
        return newAnimal.save();
    },
    animalImageInfoAdd: (id) => {
        var animalUpdate = {
            photoUrl: "images/animal/" + id + ".jpg"
        };
        // 根据ID更新信息
        return AnimalModel.findByIdAndUpdate(id, animalUpdate).exec();
    },
    animalInfoUpdate: (data) => {
        var animalUpdate = {
            name: data.name,
            type: data.type,
            variety: data.variety,
            age: data.age,
            gender: data.gender,
            findingLocation: data.findingLocation,
            price: data.price,
            isAdopted: data.isAdopted,
            healthStatus: data.healthStatus,
            roomNumber: data.roomNumber
        };
        // 根据ID更新信息
        return AnimalModel.findByIdAndUpdate(data.id, animalUpdate).exec();
    },
    animalDelete: (id) => {
        return AnimalModel.findByIdAndDelete(id).exec();
    },
    animalSearch: (searchTxt)=> {
        // 模糊查询，'i'代表不分大小写
        var regex = new RegExp(searchTxt,'i');
        var whereStr = {'name':regex};
        return AnimalModel.find(whereStr).exec();
    },
    animalAdopte: (data) => {
        var adopted = {
            isAdopted: true,
        };
        // 根据ID更新信息
        return AnimalModel.findByIdAndUpdate(data.id, adopted).exec();
    },
    animalCommentAdd: (data)=> {
        var newComment = {
            userId: data.userId,
            userName: data.userName,
            userComment: data.userComment,
            timeStamp: Date.now()
        };
        return AnimalModel.findByIdAndUpdate(data.id, {$push: {comment: newComment}}).exec();
    },
    
    
    // Plant
    getAllPlants: () => {
        return PlantModel.find({}).exec();
    },
    getPlantById: (id) => {
        return PlantModel.findById(id).exec();
    },
    plantInfoAdd: (data) => {
        // 定义一行即将插入的数据document
        var newPlant = new PlantModel({
            name: data.name,
            type: data.type,
            variety: data.variety,
            age: data.age,
            price: data.price,
            isAdopted: data.isAdopted,
            healthStatus: data.healthStatus,
            photoUrl: "",
            roomNumber: data.roomNumber,
            timeStamp: Date.now()
        });
        return newPlant.save();
    },
    plantImageInfoAdd: (id) => {
        var plantUpdate = {
            photoUrl: "images/plant/" + id + ".jpg"
        };
        // 根据ID更新信息
        return PlantModel.findByIdAndUpdate(id, plantUpdate).exec();
    },
    plantInfoUpdate: (data) => {
        var plantUpdate = {
            name: data.name,
            type: data.type,
            variety: data.variety,
            age: data.age,
            price: data.price,
            isAdopted: data.isAdopted,
            healthStatus: data.healthStatus,
            roomNumber: data.roomNumber
        };

        // 根据ID更新信息
        return PlantModel.findByIdAndUpdate(data.id, plantUpdate).exec();
    },
    plantDelete: (id) => {
        return PlantModel.findByIdAndDelete(id).exec();
    },
    plantSearch: (searchTxt)=> {
        // 模糊查询，'i'代表不分大小写
        var regex = new RegExp(searchTxt,'i');
        var whereStr = {'name':regex};
        return PlantModel.find(whereStr).exec();
    },
    plantAdopte: (data) => {
        var adopted = {
            isAdopted: true,
        };
        // 根据ID更新信息
        return PlantModel.findByIdAndUpdate(data.id, adopted).exec();
    },
    plantCommentAdd: (data)=> {
        var newComment = {
            userId: data.userId,
            userName: data.userName,
            userComment: data.userComment,
            timeStamp: Date.now()
        };
        return PlantModel.findByIdAndUpdate(data.id, {$push: {comment: newComment}}).exec();
    },
    
    
    // Room
    getAllRooms: () => {
        return RoomModel.find({}).exec();
    },
    getAvailableRooms: () => {
        return RoomModel.find({status:"available"}).exec();
    },
    getAnimalAvailableRooms: () => {
        return RoomModel.find({biology:"animal", status:"available"}).exec();
    },
    getPlantAvailableRooms: () => {
        return RoomModel.find({biology:"plant", status:"available"}).exec();
    },
    getRoomByRoomNumber: (roomNumber) => {
        return RoomModel.find({roomNumber:roomNumber}).exec();
    },
    roomInfoAdd: (data) => {
        // 定义一行即将插入的数据document
        var newRoom = new RoomModel({
            h2s: 0.001,
            roomNumber: data.roomNumber,
            biology: data.biology,
            status: "available",
        });
        return newRoom.save();
    },
    roomStatusToOccupied: (roomNumber) => {
        return RoomModel.update({roomNumber:roomNumber}, {status:"occupied"}).exec();
    },
    roomStatusToAvailable: (roomNumber) => {
        return RoomModel.update({roomNumber:roomNumber}, {status:"available"}).exec();
    },
    roomDelete: (roomNumber) => {
        return RoomModel.remove({roomNumber:roomNumber}).exec();
    },
    roomAddTemperatureAndHumidity: (data) => {
        return RoomModel.update(
            {roomNumber:data.roomNumber},
            {
                $push: {
                    temperature: data.temperature,
                    humidity: data.humidity
                }
            }
        ).exec();
    },
    roomDeleteTemperatureAndHumidity: (data) => {
        return RoomModel.update(
            {roomNumber:data.roomNumber},
            {
                temperature: Array,
                humidity: Array
            }
        ).exec();
    },
    roomUpdateH2S: (data) => {
        return RoomModel.update(
            {roomNumber:data.roomNumber},
            {
                h2s: data.h2s,
            }
        ).exec();
    },
    roomCurrentLocation: (data) => {
        return RoomModel.update(
            {roomNumber:data.roomNumber},
            {
                latitude: data.latitude,
                longitude: data.longitude,
                currentLocation: data.currentLocation
                
            }
        ).exec();
    },
};

module.exports = database;