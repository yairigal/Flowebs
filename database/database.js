
logos = [
    '/images/im1.jpg'
    ,'/images/im2.jpg'
    ,'/images/im3.jpg'
];
products = [
    {src:"/images/flowers/im1.jpg",price:'$15.99',name:"Flower 1",desc:"Random stuff",color:'pink'},
    {src:"/images/flowers/im2.jpg",price:'$25.99',name:"Flower 2",desc:"Random stuff",color:'pink'},
    {src:"/images/flowers/im3.jpg",price:'$35.99',name:"Flower 3",desc:"Random stuff",color:'red'},
    {src:"/images/flowers/im4.jpg",price:'$45.99',name:"Flower 4",desc:"Random stuff",color:'yellow'},
    {src:"/images/flowers/im5.jpg",price:'$55.99',name:"Flower 5",desc:"Random stuff",color:'green'}
];
branches = [
    {active:true,name:"Branch1",id:1},
    {active:true,name:"Branch2",id:2}
    ];
users = {
    "0":{
        active: false,
        id: 100,
        type: 'Manager',
        username: '',
        password: ''
    },
    "1": {
        active: true,
        id: 1,
        type: 'Worker',
        username: 'danmi',
        password: '123456',
        branchid: 1
    },
    "2": {
        active: true,
        id: 2,
        type: 'Worker',
        username: 'work1',
        password: '123',
        branchid: 2
    },
    "3": {
        active: true,
        id: 3,
        type: 'Client',
        username: 'client1',
        password: '123'
    },
    "4": {
        active: true,
        id: 4,
        type: 'Client',
        username: 'client2',
        password: '123'
    },
    "5": {
        active: true,
        id: 63,
        type: 'Manager',
        username: 'yairigal',
        password: '123456'
    },
};

flowers = products;
data = {
    images:{
        logos:logos,
        products:products
    },
    branches:branches,
    users:users,
    flowers:flowers,

    getAllActiveUsers: function () {
        let a = {};
        for (var user in this.users) {
            if (this.users[user].active)
                a[user] = (this.users[user]);
        }
        return a;
    },

    addUser: function (user) {
        try {
            user["active"] = true;
            user["id"] = this.generateId();
            this.users[user.id] = user;
            return true;
        }
        catch(err) {
            return err;
        }
    },

    editUser: function (user) {
        try {
            user["active"] = true;
            this.users[user.id] = user;
            return true;
        }
        catch(err) {
            return err;
        }
    },
    deactivateUser: function (userid) {
        try {
            this.users[userid].active = false;
            return true;
        }
        catch(err) {
            return err;
        }
    },
    generateId: function() {
        let max = 0;
        for (let user in this.users)
            if(user > max) {
                max = user;
            }
        return String(1 + Number(max));
    }
};


module.exports = data;
