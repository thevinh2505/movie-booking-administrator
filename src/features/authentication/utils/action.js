import { instance } from "api/instance";
export const SET_PROFILE = "auth/SET_PROFILE";
export const SET_ACCOUNT_INFO = "auth/SET_ACCOUNT_INFO";
// action đăng nhập
export const signInAction = (user) => {
	return async (next) => {
		try {
			const res = await instance.request({
				url: "api/QuanLyNguoiDung/DangNhap",
				method: "POST",
				data: user,
			});
			// lưu token xuống localStorage
			localStorage.setItem("token", res.data.content.accessToken);

			// lấy thông tin ng dùng, gỡ accessToken ra
			const profile = res.data.content;
			delete profile.accessToken;
			console.log(res.data.content);
			console.log('1111');
			// lưu thông tin user xuống local storage
			localStorage.setItem("user", JSON.stringify(profile));
			// lưu thông tin user lên store
			next({
				type: SET_PROFILE,
				payload: profile,
			});
		} catch (err) {
			console.log(err);
		}
	};
};
