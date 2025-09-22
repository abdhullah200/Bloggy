import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res)=>{
    try{
        // Handle different request formats
        let blogData;
        if (req.body.data && req.body.data.blog) {
            blogData = JSON.parse(req.body.data.blog);
        } else if (req.body.blog) {
            blogData = typeof req.body.blog === 'string' ? JSON.parse(req.body.blog) : req.body.blog;
        } else {
            blogData = req.body;
        }
        
        const {title, subTitle, description, category, isPublic} = blogData;
        const imageFile = req.file;

        // Checked if all fields are present
        if (!title || !description || !category || !imageFile){
            return res.json({success:false, message:"All fields are required"});
        }

        const fileBuffer= fs.readFileSync(imageFile.path);
        const response= await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        const optimizedImageUrl= imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {format: "webp"},
                {width:"1280"},
            ]
        });

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublic,
        })

        res.json({success:true, message:"Blog added successfully"});

    }catch (error){
        res.json({success:false, message: error.message});
    }
}
export const getAllBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find({isPublic: true});
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res)=>{
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
             res.json({ success: false, message: "Blog not found" });
        } else {
            res.json({ success: true, blog });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res)=>{
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const togglePublic = async (req, res)=>{
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublic = !blog.isPublic;
        await blog.save();
        res.json({ success: true, message: "Blog status updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}