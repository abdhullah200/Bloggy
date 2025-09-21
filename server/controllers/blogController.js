

export const addBlog = async (req, res)=>{
    try{
        const {title, subTitle, description, category, isPublic}= JSON.parse(req.body.data.blog);
        const image= req.file;

        // Checked if all feild are present
        if (!title || !description || !category || !image){
            return res.json({success:false, message:"All feilds are required"});
        }
    }catch (error){

    }
}