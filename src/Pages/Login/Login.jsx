import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { CiUser } from "react-icons/ci";
import { TbCircleKey } from "react-icons/tb";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
export default function Login() {
  const { loginWrapper } = styles;
  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد").required("رمز عبور الزامی است"),
  });
  return (
    <div className={loginWrapper}>
      <h3>ورود </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmiting, touched, errors }) => (
          <Form>
            <CustomInput touched={touched} errors={errors} name="username" placeholder="نام کاربری خود را وارد کنید" icon={CiUser} />
            <CustomInput type="password" touched={touched} errors={errors} name="password" placeholder="رمز خود را وارد کنید" icon={TbCircleKey} />
            <button type="submit" className={`form-btn ${isSubmiting ? "disableBtn" : ""}`} disabled={isSubmiting}>
              {isSubmiting ? "loading..." : "ورود"}
            </button>
            <p className="">
              آیا هنوز ثبت نام نکرده اید؟ <Link to={"/register"}>ثبت نام کنید</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
