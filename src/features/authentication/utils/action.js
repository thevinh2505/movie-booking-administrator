import { instance } from "api/instance";
import swal from "sweetalert";
export const SET_PROFILE = "auth/SET_PROFILE";

// action đăng nhập
export const signInAction = (user,history) => {
	return async (next) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyNguoiDung/DangNhap",
				method: "POST",
				data: user,
			});
			// console.log(res);
			// lưu token xuống localStorage
			localStorage.setItem("token", res.data.content.accessToken);

			// // lấy thông tin ng dùng, gỡ accessToken ra
			const profile = res.data.content;
			delete profile.accessToken;

			// // lưu thông tin user xuống local storage
			localStorage.setItem("user", JSON.stringify(profile));

			// // lưu thông tin user lên store
			next({
				type: SET_PROFILE,
				payload: profile,
			});
			swal({
				title: "Loged in!",
				text: "You loged in successfully!",
				icon: "success",
				button: "OK",
				timer:1500,
			});
			history.push('/')
		} catch (err) {
			swal({
				title: "Can't log in!",
				text: "Wrong username or password, please try again!",
				icon: "error",
				button: "OK",
				timer:1500,
			});
		}
	};
};

