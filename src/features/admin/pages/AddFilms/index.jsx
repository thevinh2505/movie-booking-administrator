import React, { useRef, useState } from "react";
import logo from "assets/img/logo.png";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { addFilmUploadImageAction } from "features/admin/utils/action";
const { Item } = Form;
function AddFilms() {
	const dispatch = useDispatch();
	const history=useHistory()
	//state img
	const [imgSrc, setImgSrc] = useState("");
	// form antd
	const [componentSize, setComponentSize] = useState("default");
	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

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
	// useFormik
	const formik = useFormik({
		initialValues: {
			tenPhim: "",
			trailer: "",
			moTa: "",
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
			maNhom: "GP03",
			ngayKhoiChieu: "",
		},
		onSubmit: (values) => {
			console.log(values.hinhAnh.name);

			// tạo đối tượng Form Data
			let formData = new FormData();
			for (let key in values) {
				// các tham số khác file
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				}
				// các tham số là file
				else {
					formData.append(
						"File",
						values.hinhAnh,
						values.hinhAnh.name // EM ĐANG BỊ LỖI CHỖ NÀY LOG RA UNDEFINED DÒNG 91
					);
				}
				console.log(values.hinhAnh.name);
			}

			// call api gửi giá trị về BE
			dispatch(addFilmUploadImageAction(formData,history));
		},
	});

	// hàm handle datepicker
	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};

	// hàm handle SWITCH
	const handleChangeSwitch = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};

	// hàm handle file image
	const handleChangeFile = (e) => {
		// Lấy file từ event
		// files có 's' vì khi ấn choose file có thể chọn đc nhiều file
		// files[0] vì chỉ lấy thằng đầu tiên
		let file = e.target.files[0];
		if (
			file.type === "image/jpeg" ||
			file.type === "image/jpg" ||
			file.type === "image/png" ||
			file.type === "image/gif"
		) {
			// tạo đối tượng để đọc file
			let reader = new FileReader();
			// truyền file vào để reader đọc
			reader.readAsDataURL(file);

			reader.onload = (e) => {
				// sau khi đọc file sẽ trả về dạng base64 -> e.target.result để lấy ra
				console.log(e.target.result);
				setImgSrc(e.target.result);
			};
			console.log("file", file);
		}
		// lưu dữ liệu vào formik
		formik.setFieldValue("hinhAnh", file);
	};
	return (
		<div className="">
			<nav className="sidebar close" ref={sidebar}>
				<header>
					<div className="image-text">
						<span className="image">
							<img src={logo} alt="logo" />
						</span>
						<div className="text logo-text">
							<span className="name">Dashboard</span>
							<span className="profession">Admin page</span>
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
							<a href="#0"
								onClick={(e) => {
									e.preventDefault();
									localStorage.removeItem("token");
									localStorage.removeItem("user");
									history.push("/signin");
								}}
							>
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

				<h3 className="text-text-color mt-4 mb-2 text-center text-3xl font-semibold" >Thêm phim</h3>
				<Form
					style={{marginTop:"-12px"}}
					onSubmitCapture={formik.handleSubmit}
					className="text"
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
					<Item label="Form Size" name="size">
						<Radio.Group>
							<Radio.Button value="small">Small</Radio.Button>
							<Radio.Button value="default">Default</Radio.Button>
							<Radio.Button value="large">Large</Radio.Button>
						</Radio.Group>
					</Item>
					<Item label="Tên Phim">
						<Input
							onChange={formik.handleChange}
							name="tenPhim"
							placeholder="Nhập tên phim"
						/>
					</Item>
					<Item label="Trailer">
						<Input
							onChange={formik.handleChange}
							name="trailer"
							placeholder="Nhập link trailer"
						/>
					</Item>
					<Item label="Mô Tả">
						<Input
							onChange={formik.handleChange}
							name="moTa"
							placeholder="Nhập mô tả"
						/>
					</Item>
					<Item label="Mã Nhóm">
						<Input
							onChange={formik.handleChange}
							name="maNhom"
							value="GP03"
						/>
					</Item>
					<Item label="Ngày Khởi Chiếu">
						<DatePicker
							format={"DD/MM/YY"}
							onChange={handleChangeDatePicker}
							placeholder="Chọn ngày chiếu"
						/>
					</Item>

					<Item label="Đang Chiếu" valuePropName="checked">
						<Switch onChange={handleChangeSwitch("dangChieu")} />
					</Item>
					<Item label="Sắp Chiếu" valuePropName="checked">
						<Switch onChange={handleChangeSwitch("sapChieu")} />
					</Item>
					<Item label="Hot" valuePropName="checked">
						<Switch onChange={handleChangeSwitch("hot")} />
					</Item>
					<Item label="Đánh giá " valuePropName="checked">
						<InputNumber
							className="w-40 border-none"
							onChange={(value) => {
								formik.setFieldValue("danhGia", value);
							}}
							min={1}
							max={10}
							placeholder="Nhập điểm IMDB"
						/>
					</Item>
					<Item label="Hình Ảnh" valuePropName="checked">
						<input
							onChange={handleChangeFile}
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/gif"
						/>
						<br />
						<img className="w-24" src={imgSrc} alt="anh" />
					</Item>
					<Item label="Tác vụ">
						<Button htmlType="submit">Thêm </Button>
					</Item>
				</Form>
			</div>
		</div>
	);
}

export default AddFilms;
