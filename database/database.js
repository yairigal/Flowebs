
logos = [
    '/images/im1.jpg'
    ,'/images/im2.jpg'
    ,'/images/im3.jpg'
]
products = [
    {src:"/images/products/im1.jpg",price:'$15.99',name:"Flower 1",desc:"Random stuff",color:'pink'},
    {src:"/images/products/im2.jpg",price:'$25.99',name:"Flower 2",desc:"Random stuff",color:'pink'},
    {src:"/images/products/im3.jpg",price:'$35.99',name:"Flower 3",desc:"Random stuff",color:'red'},
    {src:"/images/products/im4.jpg",price:'$45.99',name:"Flower 4",desc:"Random stuff",color:'yellow'},
    {src:"/images/products/im5.jpg",price:'$55.99',name:"Flower 5",desc:"Random stuff",color:'green'}
]
branches = [
    {active:true,name:"Branch1",id:1},
    {active:true,name:"Branch2",id:2}
    ]
users = [
    {id:0,type:'MANAGER',username:'yairigal',password:'123456'},
    {id:1,type:'WORKER',username:'danmi',password:'123456',branchid:1},
    {id:2,type:'WORKER',username:'work1',password:'123',branchid:2},
    {id:3,type:'CLIENT',username:'client1',password:'123'},
    {id:4,type:'CLIENT',username:'client2',password:'123'}
]
flowers = products
data = {
    images:{
        logos:logos,
        products:products
    },
    branches:branches,
    users:users,
    flowers:flowers
}


module.exports = data;
