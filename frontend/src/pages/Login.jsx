import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../lib/api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const validationSchema = Yup.object({
    userId: Yup.string().required("User ID is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await api.auth.login(values);
      console.log(response);

      toast.success(
        isLogin ? "Logged in successfully!" : "Registered successfully!",
      );

      resetForm();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <i
                className={`fas ${
                  isLogin ? "fa-sign-in-alt" : "fa-user-plus"
                } text-red-600 text-xl`}
              ></i>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome To !</h2>

            <p className="text-gray-600 mt-2">
              {isLogin
                ? "Please sign in to continue"
                : "Get started with your account"}
            </p>
          </div>

          {/* FORM */}
          <Formik
            initialValues={{ userId: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                {/* USER ID */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700">
                    User ID
                  </label>
                  <Field
                    name="userId"
                    type="text"
                    placeholder="Enter your user ID"
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <ErrorMessage
                    name="userId"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700">
                    Password
                  </label>

                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold"
                >
                  {isSubmitting ? "Processing..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          {/* TOGGLE */}
          <p
            className="text-center mt-5 text-sm text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          ></p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/10646422/pexels-photo-10646422.jpeg')",
        }}
      >
        <div className="h-full bg-black/50 flex items-center justify-center text-white text-center px-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Welcome</h2>
            <p className="text-xl">
              Build modern authentication UI with React & Formik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
