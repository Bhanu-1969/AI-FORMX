const mongoose=require("mongoose")
const FormSchema=new mongoose.Schema(
    {
        userid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        formname:{type:String,required:true},
        fields:[
            {
                label:{type:String,required:true},
                type:{type:String,enum:["text","radio","checkbox"],required:true},
                options:{type:[String],default:[]}
            }
        ],
        responses:[
            {
                answers:{type:[String],dafault:[]},
                submittedAt:{type:Date,default:Date.now}
            }
        ]
        
    }
)
module.exports=mongoose.model("Form",FormSchema)