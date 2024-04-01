import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../lib/react-query/queriesAndMutation";
import { useUserContext } from "../../context/AuthContext";

const antIcon = <LoadingOutlined style={{ fontSize: 18, color: "white" }} spin />;

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  const openNotificationWithIcon = (type, message = "Sign Up Failed") => {
    notification[type]({
      message: message,
      description: "Try again later",
    });
  };

  const onFinish = async (user) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        return openNotificationWithIcon("error");
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        openNotificationWithIcon("warning", "Please Login your account!");
        navigate("/");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.resetFields();
        navigate("/home");
      } else {
        openNotificationWithIcon("error", "Login failed. Please try again");
        return;
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 24, style: { color: "white" } }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={<label style={{ color: "#fff" }}>Username</label>}
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: "#fff" }}>Email</label>}
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<label style={{ color: "#fff" }}>Password</label>}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 0, span: 16 }}
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
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
          }}
        >
          {isCreatingUser || isSigningInUser || isUserLoading ? (
            <Spin indicator={antIcon} />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form.Item>

      <p className="text-white text-center font-semibold text-regular">
        Already have an account{" "}
        <Link to="/" className="underline underline-offset-2 m-1">
          Sign In
        </Link>
      </p>
    </Form>
  );
};

export default SignUp;
