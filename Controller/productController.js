import Products from "../Models/productSchema.js";


export const viewProduct = async (req, res) => {
  
        const products = await Products.find();
        
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        
        return res.status(200).json({
            status: "success",
            message: "Successfully fetched data",
            data: products
        });
    
};


export const productById=async(req,res)=>{
   const productid=req.params.id
   const product=await Products.findById(productid)
   if(!product){
   return res.status(404).json({Error:"not found",message:"product not found"})
   }
   return res.status(200).json({status: "Ok", message: "Product found", data: product})
}

export const productByCategory=async(req,res)=>{
    const{categoryname}=req.params
    const products=await Products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price')
    if(products.length===0){
      return  res.status(404).json({message:"no item found"})
    }
   return res.status(200).json({products})
}