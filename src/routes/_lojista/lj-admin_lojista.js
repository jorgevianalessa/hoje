const express = require('express')
const router = express.Router()
const { eAdmin } = require("../../../helpers/eAdmin")

// -----------------------------------------------------------------------------------------------
//   ENTRANDO PAGE COOPERADOS PARTE ADMINISTRATIVA ? 
// -----------------------------------------------------------------------------------------------
router.get('/cooperados',eAdmin,(req,res) => {
    console.log('------------------------------------------------------------------')
    console.log('(18)-> get/admin_cooperados.js')
    console.log('(19)-> view/_admin/admin/admincooperados.handlebars')
    res.render("admin/admincooperados", {layout:'participe.handlebars'})
})

module.exports = router;