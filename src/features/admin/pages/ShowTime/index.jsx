import React, { useEffect, useRef, useState } from "react";
import logo from "assets/img/logo.png";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { Button, Form, Radio, InputNumber, DatePicker, Select } from "antd";

import { instance } from "api/instance";
import { useFormik, ErrorMessage } from "formik";
import moment from "moment";
import * as yup from "yup";
const { Item } = Form;
const schema = yup.object().shape({
	ngayChieuGioChieu: yup.string().required("Vui lòng chọn lịch chiếu"),
	maRap: yup.string().required("Vui lòng chọn cụm rạp"),
	giaVe: yup.string().required("vui lòng nhập giá vé"),
});
function ShowTime() {
	// state
	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({
		heThongRapChieu: [],
		cumRapChieu: [],
	});
	const match = useRouteMatch();
	const history = useHistory();

	console.log(state.heThongRapChieu);
	useEffect(() => {
		return async () => {
			try {
				const res = await instance.request({
					url: "api/QuanLyRap/LayThongTinHeThongRap",
					method: "GET",
				});
				setState({
					...state,
					heThongRapChieu: res.data.content,
				});
			} catch (err) {
				console.log(err);
			}
		};
	}, []);

	// xử lí side bar

	const sidebar = useRef();
	const toggle = useRef();
	const searchBtn = useRef();
	const modeSwitch = useRef();
	const modeText = useRef();
	const handleToggleSidebar = () => {
		sidebar.current.classList.toggle("close");
	};
	const handleCloseSidebar = () => {
		sidebar.current.classList.remove("close");
		if (sidebar.current.classList.contains("close")) {
		}
	};
	const handleChangeTheme = () => {
		document.body.classList.toggle("dark");
		if (document.body.classList.contains("dark")) {
			modeText.current.innerText = "Light Mode";
		} else {
			modeText.current.innerText = "Dark Mode";
		}
	};

	// form antd
	const [componentSize, setComponentSize] = useState("default");
	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};
	// Hàm Call API dựa trên onChange heThongRap
	const handleChangeHeThongRap = async (value, option) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyRap/LayThongTinCumRapTheoHeThong",
				method: "GET",
				params: {
					maHeThongRap: value,
				},
			});
			console.log(res.data.content, "1");
			console.log(value);
			setState({ ...state, cumRapChieu: res.data.content });
		} catch (err) {
			console.log(err);
		}
	};

	// hàm handlechange cumrap luu vào formik
	const handleChangeCumRap = (value) => {
		return formik.setFieldValue("maRap", value);
	};

	// onchange datepicker
	const onChangeDate = (value, dateString) => {
		console.log("Selected Time: ", value);
		console.log("Formatted Selected Time: ", dateString);
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY hh:mm:ss")
		);
	};
	// onOk datepicker
	const onOk = (value) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY hh:mm:ss")
		);
	};

	// onchange input number
	const onChangeInputNumber = (value) => {
		formik.setFieldValue("giaVe", value);
	};

	// FORMIK
	const formik = useFormik({
		initialValues: {
			maPhim: match.params.id,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
		onSubmit: async (value) => {
			try {
				setIsLoading(true);
				const res = await instance.request({
					url: "api/QuanLyDatVe/TaoLichChieu",
					method: "POST",
					data: value,
				});
				setIsLoading(false);
				alert(res.data.content);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		},
		validationSchema: schema,
	});
	return (
		<div className="body">
			<nav className="sidebar close" ref={sidebar}>
				<header>
					<div className="image-text">
						<span className="image">
							<img src={logo} alt="logo" />
						</span>
						<div className="text logo-text">
							<span className="name">Codinglab</span>
							<span className="profession">Web developer</span>
						</div>
					</div>
					<i
						className="bx bx-chevron-right toggle"
						ref={toggle}
						onClick={handleToggleSidebar}
					/>
				</header>
				<div className="menu-bar">
					<div className="menu">
						<li
							className="search-box"
							ref={searchBtn}
							onClick={handleCloseSidebar}
						>
							<i className="bx bx-search icon" />
							<input
								className="p-2"
								type="text"
								placeholder="Search..."
							/>
						</li>
						<ul className="menu-links">
							<li className="nav-link">
								<NavLink to="/dashboard">
									<i className="bx bx-home-alt icon" />
									<span className="text nav-text">
										Dashboard
									</span>
								</NavLink>
							</li>
							<li className="nav-link">
								<NavLink to="/films">
									<i className="bx bx-bar-chart-alt-2 icon" />
									<span className="text nav-text">Films</span>
								</NavLink>
							</li>
							<li className="nav-link">
								<NavLink to="/addfilms">
									<i class="bx bxs-add-to-queue icon"></i>
									<span className="text nav-text">
										Add Films
									</span>
								</NavLink>
							</li>
						</ul>
					</div>
					<div className="bottom-content">
						<li className>
							<a href="#0">
								<i className="bx bx-log-out icon" />
								<span className="text nav-text">Logout</span>
							</a>
						</li>
						<li className="mode">
							<div className="sun-moon">
								<i className="bx bx-moon icon moon" />
								<i className="bx bx-sun icon sun" />
							</div>
							<span className="mode-text text" ref={modeText}>
								Dark mode
							</span>
							<div
								className="toggle-switch"
								ref={modeSwitch}
								onClick={handleChangeTheme}
							>
								<span className="switch" />
							</div>
						</li>
					</div>
				</div>
			</nav>
			<div className="home w-full">
				<Form
					onSubmitCapture={formik.handleSubmit}
					className="text "
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout="horizontal"
					initialValues={{
						size: componentSize,
					}}
					onValuesChange={onFormLayoutChange}
					size={componentSize}
				>
					<h3 className="text-text-color text-xl text-center mb-12">
						TẠO LỊCH CHIẾU
					</h3>
					<Item label="Form Size" name="size">
						<Radio.Group>
							<Radio.Button value="small">Small</Radio.Button>
							<Radio.Button value="default">Default</Radio.Button>
							<Radio.Button value="large">Large</Radio.Button>
						</Radio.Group>
					</Item>
					<Item label="Hệ thống rạp">
						{/* SELECT     */}
						<Select
							options={state.heThongRapChieu?.map(
								(heThongRap) => ({
									label: heThongRap.tenHeThongRap,
									value: heThongRap.maHeThongRap,
								})
							)}
							onChange={handleChangeHeThongRap}
							placeholder="Chọn hệ thống rạp"
						/>
					</Item>

					<Item label="Tên cụm rạp">
						<Select
							options={state.cumRapChieu?.map((cumRap) => ({
								label: cumRap.tenCumRap,
								value: cumRap.maCumRap,
							}))}
							onChange={handleChangeCumRap}
							placeholder="Chọn cụm rạp"
						/>
						{formik.touched.maRap && formik.errors.maRap && (
							<p className="text-red-600 mt-4 italic text-sm text-semibold">
								{formik.errors.maRap}
							</p>
						)}
					</Item>

					<Item label="Chọn ngày giờ chiếu">
						<DatePicker
							format="DD/MM/YYYY hh:mm:ss"
							showTime
							onChange={onChangeDate}
							onOk={onOk}
						/>
						{formik.touched.ngayChieuGioChieu &&
							formik.errors.ngayChieuGioChieu && (
								<p className="text-red-600 mt-4 italic text-sm text-semibold">
									{formik.errors.ngayChieuGioChieu}
								</p>
							)}
					</Item>
					<Item label="Giá vé " valuePropName="checked">
						<InputNumber
							onChange={onChangeInputNumber}
							min={75000}
							max={150000}
						/>
						{formik.touched.giaVe && formik.errors.giaVe && (
							<p className="text-red-600 mt-4 italic text-sm text-semibold">
								{formik.errors.giaVe}
							</p>
						)}
					</Item>
					<Item label="Tác vụ" className="text-text-color">
						<Button loading={isLoading} htmlType="submit">
							Tạo lịch chiếu{" "}
						</Button>
					</Item>
				</Form>
			</div>
		</div>
	);
}

export default ShowTime;
