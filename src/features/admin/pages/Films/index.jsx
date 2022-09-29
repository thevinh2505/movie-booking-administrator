import React, { Fragment, useEffect, useRef } from "react";
import logo from "assets/img/logo.png";
import { NavLink, useHistory } from "react-router-dom";
import { Table, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilmAction, fetchArrayFilm } from "features/admin/utils/action";

import {
	EditOutlined,
	DeleteOutlined,
	CalendarOutlined,
} from "@ant-design/icons";

const { Search } = Input;

function Films() {
	const history = useHistory();
	const dispatch = useDispatch();
	// dữ liệu arr film
	const { arrFilm } = useSelector((state) => state.admin);
	useEffect(() => {
		dispatch(fetchArrayFilm());
	}, []);
	const data = arrFilm;
	const columns = [
		{
			title: "Mã Phim",
			dataIndex: "maPhim",
			value: (text, object) => {
				return <span>{text}</span>;
			},
			sorter: (a, b) => a.maPhim - b.maPhim,
			width: "9%",
		},
		{
			title: "Hình Ảnh",
			dataIndex: "hinhAnh",
			defaultSortOrder: "descend",
			render: (text, object) => {
				return (
					<img
						style={{ minHeight: "100px" }}
						className="w-20"
						src={object.hinhAnh}
						alt="anh phim"
						onError={(e) => {
							e.target.onError = null;
							e.target.src =
								"https://lh3.googleusercontent.com/fTUn7tJC6yNwO2CzZ-rjFqc-HuFfktNHNNnRH7JlrTuekvYrZeh9BK_0J-OW_SawvRzmTvyLh_QA1eZVYJZESJe-msFqDsjV-UwblUXYcs2wTVVbzAKC7TYdEYLgu4GY64H-Z7ziJIBNjDnYNFACg1PZtHGOXW9J-X4fZhkrEXYn1LCoOSFsjiPZZ7eebnwN-NCt6eBtJO5QIGbNhQreNiHjEyf0sY4MV1VN-8AwlgRNuGcL-GouA4AoP4Bv0cPn3bSKbQFzAJrryeW6XMi7eiDlHe6xhrvHOYcYfvc0RMh4CBmlH2Atu8Hw-1O5ok1LSKcSbLt7SnuJMI64Jd5y8_DSfNyd1bXrSAIfCHqKCf0pItkngwChFgoZT58nGXlKJp2HNcM5ToBDbqMivtJDZOWNwVtScs1bEINAKv7tTLLw9e043J1t5YDPs3hQVmNFkcG-JiX_PvXpqfC9KafI34RjpRvI1oqF23daC71qA_96m2y8jAq0sBC-6vklck06K5v3WSH-tqSaKRDYVe-aFiJrnVPJiV9ebGzwfVfoSWZ8AECjTXeL5IVKu3UYfHaXuNtMlS92NZRaoMjB_6kZm8_QKBwNcyaga30mScheYUiC6r5poaFBRo66kyZniqcvSsVXB4eaMZa4O-Dt6M5nCxmV4wybBn_umZlvA7Qn2NPgCY-yILsmrGgbMjhAvLEkw1dgT2oZ9I6aX2nCm-R13Pnfa0ZewcBM_8Fp2LeX6m9s5VJmFvJMxeRRJ4F6p38Al_dMd4jbo6uXaOejQ2q277ikUWRhg606zshlztTHSEEl4YkC0rgEKTjZfDvDDJ3V3h7AfnFB0M9QH0AnX3yxGZOnKV74adB1HA3E_BvejbdbQw-R5bQUfMHpqJqQ50V_PCFOViWM5vEcx7gMc0LZ98iUCueDGf2MxXUqqqrdbhmyB3D6PqQZnUgsEq7QoLCiqrki0RmQ_D4=w700-h933-no?authuser=1";
						}}
					/>
				);
			},
			width: "9%",
		},
		{
			title: "Tên Phim",
			dataIndex: "tenPhim",
			// onFilter: (value, record) => record.address.indexOf(value) === 0,
			// sort từ A-Z
			sorter: (a, b) => {
				let tenPhimA = a.tenPhim.toLowerCase().trim();
				let tenPhimB = b.tenPhim.toLowerCase().trim();
				if (tenPhimA > tenPhimB) {
					return 1;
				} else {
					return -1;
				}
			},
			sortDirections: ["descend", "ascend"],
			width: "25%",
		},
		{
			title: "Mô Tả",
			dataIndex: "moTa",
			render: (text, film) => {
				return (
					<Fragment>
						{film.moTa.length > 200
							? film.moTa.substr(0, 200) + " ..."
							: film.moTa}
					</Fragment>
				);
			},
			width: "45%",
		},
		{
			title: "Hành Động",
			dataIndex: "hanhDong",
			render: (text, film) => {
				return (
					<div className="flex justify-around items-center">
						<NavLink
							to={`/editfilms/${film.maPhim}`}
							key={1}
							className="inline-block text-emerald-500  hover:text-cyan-500 duration-500 text-lg"
						>
							{" "}
							<EditOutlined />{" "}
						</NavLink>
						<span
							onClick={() => {
								if (
									window.confirm(
										"Do you want to delete film " +
											film.tenPhim +
											"?"
									)
								) {
									// gọi async action
									dispatch(deleteFilmAction(film.maPhim));
								}
							}}
							key={2}
							className="inline-block cursor-pointer text-red-600 hover:text-yellow-500 duration-500  text-lg"
						>
							{" "}
							<DeleteOutlined />{" "}
						</span>
						<NavLink
							to={`/showtime/${film.maPhim}`}
							className="inline-block cursor-pointer text-cyan-500   hover:text-cyan-800 duration-500  text-lg"
							onClick={() => {
								localStorage.setItem(
									"filmParams",
									JSON.stringify(film)
								);
							}}
						>
							<CalendarOutlined />
						</NavLink>
					</div>
				);
			},
		},
	];

	const onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	// xử lí side bar
	const bodyDiv = useRef();
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
		bodyDiv.current.classList.toggle("dark");
		if (bodyDiv.current.classList.contains("dark")) {
			modeText.current.innerText = "Light Mode";
		} else {
			modeText.current.innerText = "Dark Mode";
		}
		document.body.classList.toggle("dark");
		if (document.body.classList.contains("dark")) {
			modeText.current.innerText = "Light Mode";
		} else {
			modeText.current.innerText = "Dark Mode";
		}
	};

	// hàm search
	const onSearch = (value) => {
		console.log(value);
		dispatch(fetchArrayFilm(value));
	};
	return (
		<div className="body" ref={bodyDiv}>
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
							<a
								href="#0"
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
				<div className="flex justify-end items-center px-4 py-3 mt-4 rounded-l-full rounded-br-full bg-sidebar-color w-max ml-auto mr-16">
					<img className="w-12 h-12 " alt='' src="https://picsum.photos/300" style={{borderRadius:'50%'}} />
					<h3 className="text-right text-text-color text-lg ml-4"><span className="text-text-color text-base">Welcome back</span> {(JSON.parse(localStorage.getItem('user')).hoTen)} !</h3>
				</div>
				<div className="text " style={{marginTop:"-12px"}}>
					<h3 className="text-text-color text-4xl font-semibold text-center">Quản lí phim</h3>
					<Button
						onClick={() => {
							history.push("/addfilms");
						}}
						className="mt-2"
					>
						Thêm phim
					</Button>
					<Search
						className="my-4 text-text-color search-button"
						placeholder="Tìm tên phim"
						allowClear
						onSearch={onSearch}
						size="medium"
					/>
					<Table
						className="text-text-color"
						columns={columns}
						dataSource={data}
						onChange={onChange}
						pagination={{ pageSize: 3 }}
						rowKey={"maPhim"}
					/>
				</div>
			</div>
		</div>
	);
}

export default Films;
