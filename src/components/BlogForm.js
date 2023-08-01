import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            placeholder="Enter blog title..."
          />
        </div>
        <div>
          <label>author:</label>
          <input
            value={newAuthor}
            onChange={(event) => {
              setNewAuthor(event.target.value);
            }}
            placeholder="Enter blog author..."
          />
        </div>
        <div>
          <label>url:</label>
          <input
            value={newUrl}
            onChange={(event) => {
              setNewUrl(event.target.value);
            }}
            placeholder="Enter blog url..."
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
