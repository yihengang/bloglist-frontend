import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [postMessage, setPostMessage] = useState(null);
  const [postSuccess, setPostSuccess] = useState(true);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedJSONUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedJSONUser) {
      const user = JSON.parse(loggedJSONUser);
      setUser(user);
      console.log(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Incorrect Details Entered");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsername={handleUsername}
        handlePassword={handlePassword}
      />
    );
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (newBlogObj) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(newBlogObj);
      setBlogs(blogs.concat(returnedBlog));
      // const updatedBlogs = await blogService.getAll();
      // setBlogs(updatedBlogs);
      // blogService.getAll().then((blogs) => setBlogs(blogs));
      setPostMessage(
        `Blog ${newBlogObj.title} by ${newBlogObj.author} added by ${user.username}`
      );
      setPostSuccess(true);
      setTimeout(() => {
        setPostMessage("");
      }, 5000);
    } catch (error) {
      setPostMessage("Please fill in details of the blog.");
      setPostSuccess(false);
      setTimeout(() => {
        setPostMessage("");
      }, 5000);
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = {
      author: blog.author,
      user: blog.user.id,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };
    console.log(changedBlog);

    const returnedBlog = await blogService.update(id, changedBlog);
    console.log(returnedBlog);
    setBlogs(
      blogs.map((eachblog) =>
        eachblog.id !== blog.id ? eachblog : returnedBlog
      )
    );
    // const updatedBlogs = await blogService.getAll();
    // setBlogs(updatedBlogs);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id);
      // setPersons(persons.filter((person) => person.id !== id));
      setBlogs(blogs.filter((outdatedblog) => outdatedblog.id !== blog.id));
    }
  };

  return (
    <>
      <h1>Blog app</h1>
      {errorMessage ? <div className="error">{errorMessage}</div> : null}

      {
        !user && loginForm()
        // <>
        //   <h2> Log in </h2>
        //   <form onSubmit={handleLogin}>
        //     <div>
        //       <label>Username</label>
        //       <input
        //         type="text"
        //         name="Username"
        //         value={username}
        //         onChange={handleUsername}
        //       ></input>
        //     </div>
        //     <div>
        //       <label>Password</label>
        //       <input
        //         type="password"
        //         name="Password"
        //         value={password}
        //         onChange={handlePassword}
        //       ></input>
        //     </div>
        //     <button type="submit">login</button>
        //   </form>
        // </>
      }

      {user && (
        <div>
          {postMessage ? (
            <div className={postSuccess ? "success" : "error"}>
              {postMessage}
            </div>
          ) : null}
          <p>
            <span>
              {user.name} logged in
              <button onClick={handleLogout}>Logout</button>
            </span>
          </p>
          {blogForm()}
          <h2>blogs:</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={() => {
                  handleLike(blog.id);
                }}
                handleDelete={() => handleDelete(blog)}
                user={user}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
