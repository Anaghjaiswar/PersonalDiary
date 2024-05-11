import { Button, Checkbox, Form, Input } from "antd";
import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutation";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 18, color: "white" }} spin />
);

const SignIn = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();

  const openNotificationWithIcon = (type, message = "Sign Up Failed") => {
    notification[type]({
      message: message,
      description: "Try again later",
    });
  };

  // Query
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();
  const onFinish = async (user) => {
    const session = await signInAccount(user);

    if (!session) {
      openNotificationWithIcon("warning", "Please check");

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.resetFields();

      navigate("/home");
    } else {
      openNotificationWithIcon("error", "Login Failed");

      return;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          hover="true"
        >
          {isPending || isUserLoading ? (
            <Spin indicator={antIcon} />
          ) : (
            "Sign In"
          )}
        </Button>
      </Form.Item>

      <p className="text-white text-center font-semibold text-regular">
        New here?{" "}
        <Link to="/signUp" className="underline underline-offset-2 m-1">
          Sign up
        </Link>{" "}
        to get started!
      </p>
    </Form>
  );
};

export default SignIn;
