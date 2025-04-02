import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    bookName : {
        type : String,
    },
    image : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],
    authorName: 
    { type: String,
       required: true 
      },
    authorDescrip: 
    { type: String, 
      required: true
     },
    imprint:
     { type: String, 
      required: true 
    },
    published: 
    { type: Date, 
      required: true
     },
    // unit : {
    //     type : String,
    //     default : ""
    // },
    // stock : {
    //     type : Number,
    //     default : null
    // },
    price : {
        type : Number,
        defualt : null
    },
    bookDescription: 
  { type: String,
     required: true 
    },
    
  isbn: 
  { type: Number, 
    required: true
  },
  length: {
     type: Number,
      required: true
    },
  link: {
    type: String, 
    required: true
  }
    // discount : {
    //     type : Number,
    //     default : null
    // },
    // description : {
    //     type : String,
    //     default : ""
    // },
    // more_details : {
    //     type : Object,
    //     default : {}
    // },
    // publish : {
    //     type : Boolean,
    //     default : true
    // }
},{
    timestamps : true
})

// create a text index
productSchema.index({
    bookName  : "text",
    authorName  : "text",
    bookDescription : 'text'
},{
    bookName : 10,
    authorName: 10,
    bookDescription : 5
})


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel