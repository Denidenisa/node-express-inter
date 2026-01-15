const{Schema}=require("mongoose")

const categorySchema =new Schema()

const Category = model('Category',categorySchema)


module.exports=Category