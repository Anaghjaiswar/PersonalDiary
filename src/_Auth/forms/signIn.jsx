import React from 'react'
import { Button, Checkbox, Form, Input } from "antd";
import {Link} from 'react-router-dom';

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignIn = () => {

  return (
    <Form
      name="basic"
      labelCol={{
        span: 24,
        style: { color: "white" },
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={<label style={{ color: "#fff" }}>Username</label>}
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: "#fff" }}>Password</label>}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"

          style={{
            width: "100%",
            fontSize: "0.8rem",
            backgroundColor: "#1890ff", // Set the button background color
            borderColor: "#1890ff", // Set the button border color
          }}
          hover = "true"
        >
          Sign In
        </Button>
      </Form.Item>

      <p className='text-white text-center font-semibold text-regular'>New here? <Link to = "/signUp" className='underline underline-offset-2 m-1'>Sign up</Link> to get started!</p>
    </Form>
  )
}

export default SignIn