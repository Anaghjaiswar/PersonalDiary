import { useState } from "react";
import { message } from "antd";
import { Modal as AntModal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import PropTypes from 'prop-types';

const Modal = ({ onClose }) => {
  const [blogContent, setBlogContent] = useState("");
  // const [image, setImage] = useState(null);
  // const [isPrivate, setIsPrivate] = useState(false);

  const handleContentChange = (e) => {
    setBlogContent(e.target.value);
  };

  const handleImageChange = () => {
    // Handle image upload
  };  

  // const handlePrivacyChange = (e) => {
  //   setIsPrivate(e.target.checked);
  // };

  const handleCreateBlog = () => {
    if (!blogContent.trim()) {
      message.error("Blog content cannot be empty.");
      return;
    }

    AntModal.confirm({
      title: "Confirm Blog Privacy",
      content: "Do you want to create a public or private blog?",
      okText: "Public",
      cancelText: "Private",
      onOk: () => {
        // Handle public blog creation
        message.success("Blog Visibility: Public");
        onClose();      
      },
      onCancel: () => {
        // Handle private blog creation
        message.success("Blog Visibility: Private");
        onClose();
      },
    });
  };

  return (
    <div className="modal-wrapper flex items-center justify-center">
      <div className="modal w-11/12 bg-primary rounded-lg flex flex-col items-center">
        <div className="modal-content w-11/12 flex flex-col items-start">
          <div className="w-full flex justify-between text-white">
            <h2 className="font-semibold text-xl my-6">Create a New Blog</h2>
            <button onClick={onClose}>
              <CloseCircleOutlined className="text-white" />
            </button>
          </div>
          <textarea
            className="w-full rounded px-3 py-1"
            value={blogContent}
            onChange={handleContentChange}
            placeholder="Enter your blog content here"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="file-input rounded-md border-none my-2 text-white"
          />

          <button
            className="w-full bg-options font-semibold rounded p-1.5 my-10"
            onClick={handleCreateBlog}
          >
            Create Blog
          </button>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired, 
};

export default Modal;
