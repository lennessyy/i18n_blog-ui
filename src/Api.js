import axios from "axios"
import jwt from "jsonwebtoken"

const BASE_API_URL = process.env.ApiEndpoint || "http://localhost:3001";

class BlogApi {
    static async getBlogs(token, query = {}){
        const result = await axios.get(`${BASE_API_URL}/posts`, {
            params: { _token: token, ...query }
        })
        return result.data
    }

    static async getBlog(token, id){
        const blog = await axios.get(`${BASE_API_URL}/posts/${id}`, {params: {_token: token}})
        return blog
    }

    static async getBlogAndAuthor(token, blogId, authorId){
        const blog = await axios.get(`${BASE_API_URL}/posts/${blogId}`, {params: {_token: token}})
        const author = await axios.get(`${BASE_API_URL}/users/${authorId}`, {params: {_token: token}})

        return {blog, author}
    }

    // Take a token, verify and return user information
    static async getUser(token){
        let user = jwt.decode(token)
        if (user){
            const id = user.id
            const result = await axios.get(`${BASE_API_URL}/users/${id}`)
            return result
        } 
    }

    static async createBlog(token, blog){
        let user = jwt.decode(token)
        if (user){
            const id = user.id
            blog.author = id;
            const result = await axios.post(`${BASE_API_URL}/posts?_token=${token}`, blog)
            return result
        }
    }
}

export default BlogApi