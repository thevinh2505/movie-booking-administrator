import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as yup from "yup";
import { string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signInAction } from "features/authentication/utils/action";

const schema = yup.object().shape({
	taiKhoan: string("*Sai định dạng taikhoan").required("*Vui lòng nhập"),
	matKhau: string("*Sai định dạng mật khẩu")
		.required("*Vui lòng nhập")
		.min(6, "*Tối thiểu 6 kí tự")
		.max(16, "*Tối đa 16 kí tự"),
});
function SignIn() {
	const dispatch = useDispatch();
	const history = useHistory();
	const goToHome = () => {
		history.push("/");
	};
	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
		},
		onSubmit: (values) => {
			handleSignIn(values);
			history.push("/dashboard");
		},
		validationSchema: schema,
		validateOnChange: false,
	});
	const handleSignIn = (user) => {
		dispatch(signInAction(user));
	};
	return (
		<div className="min-w-screen min-h-screen l bg-login items-center justify-center flex">
			<div className="sign-in-container relative">
				<div className="sign-in-title text-white text-center">
					<img
						className="w-52 mx-auto"
						src="https://themehut.co/wp/movflx/wp-content/themes/movflx/assets/img/logo/logo.png"
						alt="logo"
					/>

					<p className="mt-4 mb-10  mx-auto text-2xl font-medium leading-8 sign-in-title-text">
						Sign in to your account
					</p>
				</div>
				<div className=" relative  sign-in-modal w-full h-full md:max-w-xl">
					<form onSubmit={formik.handleSubmit}>
						<div className="inputBox mx-auto">
							<input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								name="taiKhoan"
								type="text"
							/>
							<span>Account Name</span>
						</div>
						{formik.touched.taiKhoan && formik.errors.taiKhoan && (
							<p className="text-red-600 ml-1 italic text-sm text-semibold">
								{formik.errors.taiKhoan}
							</p>
						)}
						<div className="inputBox  mx-auto">
							<input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								name="matKhau"
								type="password"
							/>
							<span>Password</span>
						</div>
						{formik.touched.matKhau && formik.errors.matKhau && (
							<p className="text-red-600 ml-1 italic ">
								{formik.errors.matKhau}
							</p>
						)}
						<div className="inputBox mx-auto">
							<Button
								className="w-full h-full block text-white sign-in-btn "
								htmlType="submit"
							>
								<span className="font-medium text-base">
									Log in to your account
								</span>
							</Button>
						</div>
					</form>
				</div>
				<div className="sign-in-close-btn absolute -top-5 -right-5">
					<AiOutlineCloseCircle
						className="text-5xl text-white cursor-pointer"
						onClick={goToHome}
					/>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
