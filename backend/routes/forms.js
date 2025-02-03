const express=require('express')
const router=express.Router()

const {getAllForms,createForm,getForm,login,register,createResponse,downloadResponse}=require('../controller/forms')
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/:id').post(createForm).get(getAllForms)
router.route('/fill/:id').get(getForm)
router.route('/submit/:id').post(createResponse)
router.route('/download/:formid').get(downloadResponse)

module.exports=router