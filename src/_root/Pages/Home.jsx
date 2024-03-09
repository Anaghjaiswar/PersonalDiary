import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Tooltip } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  CameraOutlined,
  DragOutlined,
  InsertRowBelowOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

function Blog({
  blog,
  index,
  moveBlog,
  updateText,
  deleteBlog,
  attachImage,
  handleImageUpload,
  addBlogAbove,
  addBlogBelow,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "BLOG",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "BLOG",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBlog(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleFileChange = (index, event) => {
    handleImageUpload(index, event);
  };

  return (
    <div
      ref={(node) => drop(drag(node))}
      className={`relative mb-3 ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="blog-image-container bg-[#3d3d3d] rounded-t-md rounded-r-md">
        {blog.image && (
          <img
            src={blog.image}
            alt={`Blog ${index + 1} Image`}
            className="mt-2 rounded-lg w-full h-56 object-contain"
          />
        )}
      </div>
      <ReactQuill
        value={blog.text}
        onChange={(value) => updateText(index, value)}
        style={{ color: "#ffffff" }}
        placeholder={`Blog ${index + 1}`}
        className="quill-editor mt-2"
      />
      <div className="absolute top-0 right-0 p-2 flex flex-wrap space-x-2">
        <Tooltip title="Attach Img">
          <button
            className="bg-options rounded"
            onClick={() => attachImage(index)}
          >
            <CameraOutlined
              style={{
                fontSize: "16px",
                color: "#FFFFFF",
                padding: "6px",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip title="Add Blog Above">
          <button
            className="bg-options rounded hidden md:block"
            onClick={() => addBlogAbove(index)}
          >
            <InsertRowAboveOutlined
              style={{
                fontSize: "16px",
                color: "#FFFFFF",
                padding: "6px",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip title="Add Blog Below">
          <button
            className="bg-options rounded hidden md:block"
            onClick={() => addBlogBelow(index)}
            data-tip={`Add Blog Above ${index}`}
            data-for={`tooltip-${index}`}
          >
            <InsertRowBelowOutlined
              style={{
                fontSize: "16px",
                color: "#FFFFFF",
                padding: "6px",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip title="Delete">
          <button
            className="bg-options rounded"
            onClick={() => deleteBlog(index)}
          >
            <DeleteOutlined
              style={{
                fontSize: "16px",
                color: "#ffffff",
                padding: "6px",
              }}
            />
          </button>
        </Tooltip>
        <label
          htmlFor={`fileInput_${index}`}
          className="bg-options cursor-pointer rounded hidden md:block"
        >
          <button className="bg-options cursor-move rounded" ref={drag}>
            <DragOutlined
              style={{
                fontSize: "16px",
                color: "#ffffff",
                padding: "6px",
              }}
            />
          </button>
          <input
            id={`fileInput_${index}`}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => handleFileChange(index, event)}
          />
        </label>
      </div>
    </div>
  );
}

function Home() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = () => {
    setBlogs([...blogs, { text: "", image: null }]);
  };

  // Function to add a new block above
  const addBlogAbove = (index) => {
    const updatedBlogs = [...blogs];
    const newBlog = {
      text: `Blog ${index + 1}`,
      image: null,
    };

    // Copy the text from the blog above
    if (index > 0) {
      newBlog.text = updatedBlogs[index - 1].text;
    }

    updatedBlogs.splice(index, 0, newBlog);
    setBlogs(updatedBlogs);
  };

  // Function to add a new block below
  const addBlogBelow = (index) => {
    const updatedBlogs = [...blogs];
    const newBlog = {
      text: `Blog ${index + 2}`,
      image: null,
    };

    // Copy the text from the blog below
    if (index < updatedBlogs.length - 1) {
      newBlog.text = updatedBlogs[index + 1].text;
    }

    updatedBlogs.splice(index + 1, 0, newBlog);
    setBlogs(updatedBlogs);
  };

  const updateText = (index, content) => {
    if (content.length <= 250) {
      const updatedBlogs = [...blogs];
      updatedBlogs[index].text = content;
      setBlogs(updatedBlogs);
    }
  };

  const deleteBlog = (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs.splice(index, 1);
    setBlogs(updatedBlogs);
  };

  const attachImage = (index) => {
    const fileInput = document.getElementById(`fileInput_${index}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageUpload = (index, event) => {
    const files = event?.target?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const updatedBlogs = [...blogs];
      updatedBlogs[index].image = URL.createObjectURL(file);
      setBlogs(updatedBlogs);
    }
  };

  const moveBlog = (fromIndex, toIndex) => {
    const updatedBlogs = [...blogs];
    const [removedBlog] = updatedBlogs.splice(fromIndex, 1);
    updatedBlogs.splice(toIndex, 0, removedBlog);
    setBlogs(updatedBlogs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="flex flex-col items-center bg-primary p-4">
      <h1 className="text-base md:text-xl lg:text-2xl  text-center text-secondary mt-4 mb-8">
        <span className="font-semibold">Scribbles</span> : Your Personal Diary
      </h1>

      <div className="w-full">
        <div
          className="addBlog flex flex-col justify-center items-center cursor-pointer rounded-xl bg-primary w-full h-36 m-4"
          onClick={addBlog}
        >
          <AppstoreAddOutlined style={{ fontSize: "48px", color: "#d8d8d8" }} />
          <h1 className="text-base text-secondary mt-2">Add your Blog</h1>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center bg-primary mt-4">
      <div className="yourBlogs w-full justify-center items-center bg-primary rounded-xl my-4 mx-2">
        <div className="w-full p-4">
          <h1 className="text-lg text-secondary mb-4">Your Blogs</h1>

          {blogs.map((blog, index) => (
            <Blog
              key={index}
              blog={blog}
              index={index}
              moveBlog={moveBlog}
              updateText={updateText}
              deleteBlog={deleteBlog}
              attachImage={attachImage}
              handleImageUpload={handleImageUpload}
              addBlogAbove={addBlogAbove}
              addBlogBelow={addBlogBelow}
            />
          ))}
        </div>
      </div>
    </div>
  </DndProvider>
);
}

export default Home;
