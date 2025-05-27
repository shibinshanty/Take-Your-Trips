const express=require('express');
const router=express.Router();

const{contactEmail}=require('../controllers/contactController');

router.post('/contact',contactEmail);


module.exports=router;