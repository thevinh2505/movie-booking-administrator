import { instance } from "api/instance";
import { history } from "app/App";
import swal from "sweetalert";
export const SET_ARRAY_FILM = "admin/SET_ARRAY_FILM";
export const SET_MOVIE_DETAIL = "booking/SET_MOVIE_DETAIL";
export const SET_CINEMA_SYSTEM_INFO = "booking/SET_CINEMA_SYSTEM_INFO";
// lấy ds phim
export const fetchArrayFilm = (tenPhim = "") => {
	if (tenPhim.trim() !== "") {
		return async (next) => {
			try {
				const res = await instance.request({
					url: "api/QuanLyPhim/LayDanhSachPhim",
					method: "GET",
					params: {
						maNhom: "GP03",
						tenPhim: tenPhim,
					},
				});
				next({
					type: SET_ARRAY_FILM,
					payload: res.data.content,
				});
			} catch (err) {
				console.log(err);
			}
		};
	}
	return async (next) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyPhim/LayDanhSachPhim",
				method: "GET",
				params: {
					maNhom: "GP03",
				},
			});
			next({
				type: SET_ARRAY_FILM,
				payload: res.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

// thêm phim load hình
export const addFilmUploadImageAction = (formData) => {
	return async (next) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyPhim/ThemPhimUploadHinh",
				method: "POST",
				data: formData,
			});
			alert("Add film successfully!");
			console.log(res.data.content);
			// next({

			// })
		} catch (err) {
			console.log(err);
		}
	};
};

// Call thông tin phim trang chỉnh sửa phim
export const fetchMovieDetailAction = (maPhim) => {
	return async (next) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyPhim/LayThongTinPhim",
				method: "GET",
				params: {
					MaPhim: maPhim,
				},
			});
			next({
				type: SET_MOVIE_DETAIL,
				payload: res.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

// Cập nhật film
export const updateFilmAction = (formData) => {
	return async (dispatch) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyPhim/CapNhatPhimUpload",
				method: "POST",
				data: formData,
			});

			dispatch(fetchArrayFilm());
			history.push("/films");
			swal({
				title: "Edit film successfully!",
				text: "Film edited successfully!",
				icon: "success",
				button: "OK",
			});
		} catch (err) {
			console.log(err);
			swal({
				title: "Can't edit film!",
				text: "Edit film failed!",
				icon: "error",
				button: "OK",
			});
		}
	};
};

// Xóa film
export const deleteFilmAction = (maPhim, tenPhim) => {
	return async (next) => {
		try {
			await instance.request({
				url: "api/QuanLyPhim/XoaPhim",
				method: "DELETE",
				params: {
					MaPhim: maPhim,
				},
			});
			swal({
				title: "Delete film successfully",
				text: "You delete successfully" + tenPhim,
				icon: "success",
				button: "OK",
			});

			next(fetchArrayFilm());
		} catch (err) {
			swal({
				title: "Cant' delete " + tenPhim,
				text: "Only admin can delete film",
				icon: "error",
				button: "OK",
			});
			console.log(err);
		}
	};
};

// lấy thông tin hệ thống rạp
export const fetchscheduleAction = async (next) => {
	try {
		const res = await instance.request({
			url: "api/QuanLyRap/LayThongTinHeThongRap",
			method: "GET",
		});
		next({
			type: SET_CINEMA_SYSTEM_INFO,
			payload: res.data.content,
		});
		console.log("hệ thống rạp: ", res.data.content);
		return res.data.content;
	} catch (err) {
		console.log(err);
	}
};

// tạo lịch chiếu
export const createShowtimeAction = (thongTinLichChieu) => {
	return async () => {
		try {
			await instance.request({
				url: "api/QuanLyDatVe/TaoLichChieu",
				method: "POST",
				data: thongTinLichChieu,
			});
		} catch (err) {
			console.log(err);
		}
	};
};
