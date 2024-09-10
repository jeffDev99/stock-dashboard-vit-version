// libraries
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
// custom Componnets
import CustomInput from "../../Components/CustomInput/CustomInput";
// icons
import { CiUser } from "react-icons/ci";
import { TbCircleKey } from "react-icons/tb";
// styles
import styles from "./Login.module.css";

export default function Login() {
  const { loginWrapper } = styles;
  const initialValues = { userName: "", password: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const validationSchema = Yup.object({
    userName: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد").required("رمز عبور الزامی است"),
  });
  return (
    <div className={loginWrapper}>
      <h3>ورود </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const UserData = {
            userName: values.userName,
            password: values.password,
          };
          (async () => {
            try {
              setLoading(true);
              const response = await fetch("https://fani.khz-fanoos.ir/api/Auth/login", {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(UserData),
              });
              const data = await response.text();
              if (data === "invalid credentials") {
                Swal.fire({
                  title: "نام کاربری یا رمز عبور تکراری میباشد",
                  text: "نام کاربری یا رمز عبور تکراری میباشد. لطفا ورودی های خود را چک کنید",
                  icon: "error",
                }).then((res) => {
                  resetForm();
                  throw new Error(data);
                });
              } else {
                Swal.fire({
                  title: "ورود با موفقیت انجام شد",
                  text: "لطفا جهت هدایت به داشبورد روی دکمه زیر کلیک کنید",
                  confirmButtonText: "داشبورد",
                  icon: "success",
                }).then((res) => {
                  navigate("/dashboard");
                  Cookies.set("token", data, { expires: 7 });
                });
              }
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          })();
        }}
      >
        {({ isSubmiting, touched, errors }) => (
          <Form>
            <CustomInput touched={touched} errors={errors} name="userName" placeholder="نام کاربری خود را وارد کنید" icon={CiUser} />
            <CustomInput type="password" touched={touched} errors={errors} name="password" placeholder="رمز خود را وارد کنید" icon={TbCircleKey} />
            <button type="submit" className={`form-btn ${isSubmiting ? "disableBtn" : ""}`} disabled={isSubmiting}>
              {isSubmiting ? "loading..." : "ورود"}
            </button>
            <p className="">
              آیا هنوز ثبت نام نکرده اید؟ <Link to={"/register"}>ثبت نام کنید</Link>
            </p>
            {loading && <div className="loader"></div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
