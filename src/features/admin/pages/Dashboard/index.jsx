import React, { useRef } from "react";
import logo from "assets/img/logo.png";
import { NavLink } from "react-router-dom";
function Dashboard() {
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
								<NavLink to='/dashboard'>
									<i className="bx bx-home-alt icon" />
									<span className="text nav-text">
										Dashboard
									</span>
								</NavLink>
							</li>
							<li className="nav-link">
								<NavLink to="/films">
									<i className="bx bx-bar-chart-alt-2 icon" />
									<span className="text nav-text">
										Films
									</span>
								</NavLink>
							</li>
							<li className="nav-link">
								<NavLink to='/addfilms'>
								<i class='bx bxs-add-to-queue icon'></i>
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
			<div className="home">
				<p className="text">hi</p>
			</div>
		</div>
	);
}

export default Dashboard;
