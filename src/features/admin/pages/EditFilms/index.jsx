import React, { useEffect, useRef, useState } from "react";
import logo from "assets/img/logo.png";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchMovieDetailAction,
	updateFilmAction,
} from "features/admin/utils/action";
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
const { Item } = Form;
function EditFilms() {
	//state img
	const [imgSrc, setImgSrc] = useState("");
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const id = match.params.id;
	useEffect(() => {
		dispatch(fetchMovieDetailAction(id));
	}, []);
	const movieDetail = useSelector((state) => state.admin.movieDetail);
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

	// formik
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: movieDetail?.maPhim,
			tenPhim: movieDetail?.tenPhim,
			trailer: movieDetail?.trailer,
			moTa: movieDetail?.moTa,
			dangChieu: movieDetail?.dangChieu,
			sapChieu: movieDetail?.sapChieu,
			hot: movieDetail?.hot,
			danhGia: movieDetail?.danhGia,
			hinhAnh: null, // nếu là null thì sẽ k cập nhật hình ảnh
			maNhom: "GP03",
			ngayKhoiChieu: movieDetail?.ngayKhoiChieu,
		},
		onSubmit: (values) => {
			console.log(values, "values");
			// tạo đối tượng Form Data
			let formData = new FormData();
			for (let key in values) {
				// các tham số khác file
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				}
				// các tham số là file
				else {
					if (values.hinhAnh !== null) {
						formData.append(
							"File",
							values.hinhAnh,
							values.hinhAnh.name
						);
					}
				}
			}

			// call api gửi giá trị về BE
			dispatch(updateFilmAction(formData));
		},
	});
	// hàm handle datepicker
	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value);
		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};

	// hàm handle SWITCH
	const handleChangeSwitch = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};

	// hàm handle file image
	const handleChangeFile = async (e) => {
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
			// lưu dữ liệu vào formik
			await formik.setFieldValue("hinhAnh", file);
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

				<h3 className="text-text-color text-center text-3xl mt-4 mb-2 font-semibold">Edit phim</h3>
				<Form
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
							value={formik.values.tenPhim}
						/>
					</Item>
					<Item label="Trailer">
						<Input
							onChange={formik.handleChange}
							name="trailer"
							value={formik.values.trailer}
						/>
					</Item>
					<Item label="Mô Tả">
						<Input
							onChange={formik.handleChange}
							name="moTa"
							value={formik.values.moTa}
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
							format={"DD/MM/YYYY"}
							onChange={handleChangeDatePicker}
							value={moment(
								formik.values.ngayKhoiChieu,
								"YYYY/MM/DD"
							)}
						/>
					</Item>

					<Item label="Đang Chiếu" valuePropName="checked">
						<Switch
							onChange={handleChangeSwitch("dangChieu")}
							checked={formik.values.dangChieu}
						/>
					</Item>
					<Item label="Sắp Chiếu" valuePropName="checked">
						<Switch
							onChange={handleChangeSwitch("sapChieu")}
							checked={formik.values.sapChieu}
						/>
					</Item>
					<Item label="Hot" valuePropName="checked">
						<Switch
							onChange={handleChangeSwitch("hot")}
							checked={formik.values.hot}
						/>
					</Item>
					<Item label="Đánh giá " valuePropName="checked">
						<InputNumber
							onChange={(value) => {
								formik.setFieldValue("danhGia", value);
							}}
							min={1}
							max={10}
							value={formik.values.danhGia}
						/>
					</Item>
					<Item label="Hình Ảnh" valuePropName="checked">
						<input
							onChange={handleChangeFile}
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/gif"
						/>
						<br />
						<img
							className="w-24"
							src={imgSrc === "" ? movieDetail.hinhAnh : imgSrc}
							alt="anh"
						/>
					</Item>
					<Item label="Tác vụ">
						<Button htmlType="submit">Cập nhật</Button>
					</Item>
				</Form>
			</div>
		</div>
	);
}

export default EditFilms;
