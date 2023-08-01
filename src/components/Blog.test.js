import { render, screen } from "@testing-library/react";
import Blog from "./Blog.js";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("<Blog /> rendering", () => {
  const testBlog = {
    title: "Blog title",
    author: "Blog author",
    url: "www.blogurl.com",
    user: "647e5192bdd4b3ad27a492eb",
    likes: 3,
  };
  const testUser = {
    username: "Test User",
    password: "Test Password",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c",
  };
  let container;

  const handleLike = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={testBlog} user={testUser} handleLike={handleLike} />
    ).container;
  });

  test("Renders blog title and url when button has not be clicked", () => {
    expect(container.querySelector(".mainDetails")).toBeDefined();
    expect(container.querySelector(".url")).toBeNull();
    expect(container.querySelector(".likes")).toBeNull();
  });

  test("Renders url and likes when button has been clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(container.querySelector(".mainDetails")).not.toBeNull();
    expect(container.querySelector(".url")).not.toBeNull();
    expect(container.querySelector(".likes")).not.toBeNull();
    screen.getByText("www.blogurl.com");
    screen.getByText("likes 3");
  });

  test("Event handler called twice when liked button pressed twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
