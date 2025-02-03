const User = require("../models/User");
const Form = require("../models/Form");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const xlsx = require('xlsx');
const JWT_SECRET = "bhanu123";
const getAllForms=async(req,res)=>{
    try{
        
        const userid=req.params.id;
        if(!userid){
            return res.status(400).json({ message: "User ID is required" });
        }
        const allforms=await Form.find({userid})
        res.status(200).json(allforms)
    }
    catch(err){
        console.log(err)
    }
}
const createForm=async(req,res)=>{
    try{
        const {userid,formname,formfield}=req.body;
        if(!userid||!formfield){
            return res.status(400).json({message:"missing user id"})
        }
        
        const newform=new Form({userid,formname,fields:formfield})
        await newform.save();
        res.status(201).json({ message: "Form created successfully", form: newform });
    }
    catch(err){
        console.log(err)
    }
    
}
const getForm=async(req,res)=>{
    try{
        const formid=req.params.id
        const form=await Form.findById(formid)
        res.send(form)
    }
    catch(err){
        console.log(err)
    }
}
const login=async(req,res)=>{
    const {username,password}=req.body;
   
    try{
        
        const user=await User.findOne({username})

        if(!user)return res.status(400).json({message:"Invalid Creditial"})
        const enPassword=await bcrypt.compare(password,user.password)
        if(!enPassword)return res.status(400).json({message:"Check Your Password"})
        const token =jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"2h"});
        res.json({token,user:{id:user._id,username:user.username}}) ;
}
    catch(err){
        res.status(500).json({err:"server error"})
    }       
}
const register=async (req,res)=>{
    const {username,password}=req.body;
    try{
        const existingUser=await User.findOne({username});
        if(existingUser) return res.status(400).json({message:"User already exist"})
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:"User sucessfully register"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: "Server error" });
    }
}
const createResponse=async(req,res)=>{
    try{
        const id=req.params.id
    let answers=req.body
    const form=await Form.findById(id)
    if (!form) {
        return res.status(404).json({ message: "Form not found." });
    }
    form.responses.push({answers})
    await form.save()
    res.status(201).json({ message: "Response recorded successfully." });
    }
    catch(err){
        console.log(err)
    }   
}
const downloadResponse=async(req,res)=>{
    try{
        const id=req.params.formid
        const form =await Form.findById(id)
        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }
        const responses=form.responses;
        const headers=form.fields.map(field=>field.label)
        const data = responses.map(response => {
            return response.answers.map(answer => (answer === null ? "N/A" : answer)); 
        });const sheetData = [headers, ...data];
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet(sheetData);  
        xlsx.utils.book_append_sheet(wb, ws, "Responses");
        const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', 'attachment; filename=responses.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);  
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error generating Excel file" });
    }

}
module.exports={
    getAllForms,
    createForm,
    getForm,
    login,
    register,
    createResponse,
    downloadResponse
}