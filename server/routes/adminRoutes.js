import express from 'express';
import { 
    adminLogin, 
    getAllBlogsAdmin, 
    getBlogByIdAdmin, 
    deleteBlogByIdAdmin, 
    approveCommentAdmin, 
    getDashboardDataAdmin 
} from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter=express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/blogs",auth,getAllBlogsAdmin);
adminRouter.get("/blogs/:blogId",auth,getBlogByIdAdmin);
adminRouter.post("/delete",auth,deleteBlogByIdAdmin);
adminRouter.post("/approve-comment",auth,approveCommentAdmin);
adminRouter.get("/dashboard",auth,getDashboardDataAdmin);


export default adminRouter;