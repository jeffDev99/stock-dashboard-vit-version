// libraries
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
// custom Componnets
import CustomInput from "../../Components/CustomInput/CustomInput";
// icons
import { CiUser } from "react-icons/ci";
import { TbCircleKey } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
// styles
import styles from "./Register.module.css";

export default function Register() {
  const { registerWrapper } = styles;
  const initialValues = { firstName: "", lastName: "", userName: "", password: "", email: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    userName: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد").required("رمز عبور الزامی است"),
    email: Yup.string().required("ایمیل الزامی است").email("لطفا یک ایمیل معتبر وارد کنید"),
  });

  return (
    <div className={registerWrapper}>
      <h3>ثبت نام </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newUserObj = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.password,
            email: values.email,
          };
          (async () => {
            try {
              setLoading(true);
              const response = await fetch("https://fani.khz-fanoos.ir/api/Auth/register", {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserObj),
              });
              const data = await response.text();
              if (data === "username alrdy exists") {
                Swal.fire({
                  title: "نام کاربری تکراری",
                  text: "این یوزر نیم تکراری میباشد لطفا برای ثبت نام از نام کاربری دیگری استفاده کنید",
                  icon: "error",
                }).then((res) => {
                  resetForm();
                  throw new Error(data);
                });
              } else if (data === "user created successfully") {
                Swal.fire({
                  title: "ثبت نام با موفقیت انجام شد",
                  text: "لطفا جهت هدایت به صفحه ورود روی دکمه زیر کلیک کنید",
                  confirmButtonText: "صفحه ورود",
                  icon: "success",
                }).then((res) => {
                  navigate("/");
                });
              } else {
                Swal.fire({
                  title: "you must call to administrator",
                  icon: "warning",
                });
              }
              console.log(data);
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
            <CustomInput touched={touched} errors={errors} name="firstName" placeholder="نام خود را وارد کنید" icon={CiUser} />
            <CustomInput touched={touched} errors={errors} name="lastName" placeholder="نام خانوادگی خود را وارد کنید" icon={CiUser} />
            <CustomInput touched={touched} errors={errors} name="userName" placeholder="نام کاربری خود را وارد کنید" icon={CiUser} />
            <CustomInput type="password" touched={touched} errors={errors} name="password" placeholder="رمز خود را وارد کنید" icon={TbCircleKey} />
            <CustomInput type="email" touched={touched} errors={errors} name="email" placeholder="ایمیل خود را وارد کنید" icon={MdAlternateEmail} />
            <button type="submit" className={`form-btn ${isSubmiting ? "disableBtn" : ""}`} disabled={isSubmiting}>
              {isSubmiting ? "loading..." : "ورود"}
            </button>
            <p className="">
              حساب کاربری دارید؟<Link to={"/"}>وارد شوید</Link>
            </p>
            {loading && <div className="loader"></div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
