import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [view, setView] = useState(false);

  const handleView = (event) => {
    event.preventDefault();
    setView(!view);
  };

  // if (blog.user.username === )

  return (
    <div className="blogStyle">
      <div className="mainDetails">
        {blog.title} {blog.author}
        <button onClick={handleView}>{view ? "unview" : "view"}</button>
        {user.username === blog.user.username ? (
          <button onClick={handleDelete}>delete</button>
        ) : null}
        {view && (
          <div key={blog.id}>
            <div className="url">{blog.url}</div>
            <div className="likes">
              likes {blog.likes} <button onClick={handleLike}>like</button>
            </div>
            <div>{blog.author}</div>
            <div>{blog.user.username}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
