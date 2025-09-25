import { createContext, useEffect, useState , useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { blog_data } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigation = useNavigate();

    const [token, setToken] = useState(null);
    const [blog, setBlog] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async()=>{
        try{
            console.log("Fetching blogs from API...");
            const {data} = await axios.get("/api/blog/all");
            console.log("API Response:", data);
            
            if (data.success) {
                if (data.blogs && data.blogs.length > 0) {
                    console.log("Found", data.blogs.length, "blogs from database");
                    
                    // Combine database blogs with static blogs
                    // Database blogs first (newest), then static blogs
                    const combinedBlogs = [...data.blogs, ...blog_data];
                    
                    // Remove any duplicates based on title or _id if they exist
                    const uniqueBlogs = combinedBlogs.filter((blog, index, array) => 
                        index === array.findIndex(b => 
                            (b._id && blog._id && b._id === blog._id) || 
                            (b.title === blog.title)
                        )
                    );
                    
                    console.log("Combined blogs count:", uniqueBlogs.length);
                    setBlog(uniqueBlogs);
                } else {
                    console.log("Database is empty, using static fallback data");
                    setBlog(blog_data);
                }
            } else {
                console.log("API returned success: false, using fallback");
                setBlog(blog_data);
            }
        }catch(error){
            console.error("Error fetching blogs:", error);
            console.log("Using static fallback data due to error");
            setBlog(blog_data);
        }
    }

    const loginUser = async (email, password) => {
        try {
            const { data } = await axios.post("/api/admin/login", { email, password });
            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                toast.success("Login successful!");
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }

    const logoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        navigation("/");
        toast.success("Logged out successfully!");
    } 

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    },[])


    const value = {
        axios,
        navigation,
        token,
        setToken,
        blog,
        setBlog,
        input,
        setInput,
        loginUser,
        logoutUser,
        fetchBlogs
    };
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
};