import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res)=>{
    try{
        const {email, password}= req.body;
        if (email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Invalid Credentials"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({success:true,token});
    }catch(error){
        res.json({success:false, message:error.message});
    }
}

export const getAllBlogsAdmin = async (req, res)=>{
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogByIdAdmin = async (req, res)=>{
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

export const deleteBlogByIdAdmin = async (req, res)=>{
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const approveCommentAdmin = async (req, res)=>{
    try {
        const { id } = req.body;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.json({ success: false, message: "Comment not found" });
        }
        comment.isApproved = !comment.isApproved;
        await comment.save();
        res.json({ success: true, message: "Comment status updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getDashboardDataAdmin = async (req, res)=>{
    try {
        const totalBlogs = await Blog.countDocuments();
        const publicBlogs = await Blog.countDocuments({ isPublic: true });
        const totalComments = await Comment.countDocuments();
        const pendingComments = await Comment.countDocuments({ isApproved: false });
        
        res.json({ 
            success: true, 
            data: {
                totalBlogs,
                publicBlogs,
                totalComments,
                pendingComments
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}