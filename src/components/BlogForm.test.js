import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> calls onSubmit", async () => {
  const addBlog = jest.fn();
  render(<BlogForm createBlog={addBlog} />);

  const user = userEvent.setup();
  const titleInputBox = screen.getByPlaceholderText("Enter blog title...");
  const authorInputBox = screen.getByPlaceholderText("Enter blog author...");
  const urlInputBox = screen.getByPlaceholderText("Enter blog url...");

  await user.type(titleInputBox, "blog title");
  await user.type(authorInputBox, "blog author");
  await user.type(urlInputBox, "blog url");

  const submitButton = screen.getByText("create");
  await user.click(submitButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("blog title");
  expect(addBlog.mock.calls[0][0].author).toBe("blog author");
  expect(addBlog.mock.calls[0][0].url).toBe("blog url");
});
