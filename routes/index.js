var express = require('express');
var router = express.Router();
let item = require('../config.json').item
let Cart = require('../model/cart')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-to-cart', async function(req, res, next) {
  let data = req.body
  let cartItem = await Cart.find();
  let TotalPrice = 0
  let discountPrice =0
  let finalPrice =0

  if(cartItem && cartItem.length>0){
    var cartData =cartItem[0]
    cartData.Items.map((cartItemsData)=>{
      if(cartItemsData.name ==data.name){
        cartItemsData.qty += data.qty
      }else{
        cartData.Items.push(data)
      }
    })
  }else{
    var cartData ={
      Items :[data]
    }
  }
    for(let cartItemData of cartData.Items){
      if(cartItemData.name =="A" && cartItemData.qty >2){
        TotalPrice += cartItemData.price*cartItemData.qty
        discountPrice  += cartItemData.qty*5
        finalPrice += (TotalPrice-discountPrice)
      }else if(cartItemData.name =="B" && cartItemData.qty >2){
      TotalPrice += cartItemData.price*cartItemData.qty
      discountPrice  += cartItemData.qty*2.5
      finalPrice += (TotalPrice-discountPrice)
      }else{
      TotalPrice += cartItemData.price*cartItemData.qty
      finalPrice += (TotalPrice-discountPrice)
      }
    }

    if(finalPrice >150){
      finalPrice -=20
      discountPrice +=20
    }
  let payload = {
    Items:cartData.Items,
    TotalPrice:TotalPrice,
    discountPrice:discountPrice,
    finalPrice:finalPrice
  }
  if(cartItem && cartItem.length>0){
    Cart.findByIdAndUpdate(cartItem[0].id, payload ,function(err, data) {

      res.status(200).send({
        status:'success',
        message:"Item added successfully"
      })
    })
  }else{
    Cart.create(payload ,function(err, model) {
      res.status(200).send({
        status:'success',
        message:"Item added successfully"
      })
    })
  }
  
  
});



router.get('/get-cart', async function(req, res, next) {
  let data = req.body
  let cartData = await Cart.find()
  res.status(200).send({
    status:'success',
    data:cartData
  })
});

module.exports = router;
