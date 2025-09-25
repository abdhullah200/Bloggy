import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

export const addBlog = async (req, res)=>{
    try{
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);
        
        const {title, subTitle, description, category, isPublic} = req.body;
        const imageFile = req.file;

        // Check if all fields are present
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

        const newBlog = await Blog.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl,
            isPublic: isPublic === 'true', // Convert string to boolean
        });

        console.log("Blog created successfully:", newBlog);
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
        
        // Check if the blogId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            // Invalid ObjectId (likely a static blog ID)
            return res.json({ success: false, message: "Blog not found in database" });
        }
        
        const blog = await Blog.findById(blogId);
        if (!blog) {
             res.json({ success: false, message: "Blog not found" });
        } else {
            res.json({ success: true, blog });
        }
    } catch (error) {
        // Handle any other errors gracefully
        res.json({ success: false, message: "Blog not found" });
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

// Comment functions
export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        
        if (!blogId || !name || !content) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if blog exists in database
        const blog = await Blog.findById(blogId);
        
        // If blog doesn't exist in database, it might be a static blog
        // Allow comment submission anyway for demo purposes
        if (!blog) {
            // For static blogs, we'll still save the comment
            // This allows the system to work with both real and demo blogs
            console.log(`Comment submitted for static blog ID: ${blogId}`);
        }

        const comment = await Comment.create({
            blog: blogId, // Use 'blog' to match the model schema
            name: name.trim(),
            content: content.trim(),
            isApproved: false // Comments need approval by default
        });

        res.json({ success: true, message: "Comment submitted for approval", comment });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        
        // Only return approved comments
        const comments = await Comment.find({ 
            blog: blogId, // Use 'blog' to match the model schema
            isApproved: true 
        }).sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}