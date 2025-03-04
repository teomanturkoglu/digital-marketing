

const PopularBlogs = () => {
    const blogs = [
        {
            title: "The Best Way to Cook a Steak",
            author: "John Doe",
            likes: 100,
            comments: 50,
        },
        {
            title: "10 Tips for a Successful Business",
            author: "Jane Doe",
            likes: 200,
            comments: 100,
        },
        {
            title: "How to Learn a New Language",
            author: "Alice",
            likes: 150,
            comments: 70,
        },
    ];
    return<div className="bg-white p-5 w-[23rem] mt-4 border ml-5 rounded">
        <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
        <ul>
            {blogs.map((blog, index) => (
                <li key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                        
                            <span className="font-bold mb-2">{blog.title}</span>
                            <span className="text-gray-600">Publish by {blog.author}</span>

                        
                    </div>
                </li>
            ))}
        </ul>
    </div>;
};

export default PopularBlogs;