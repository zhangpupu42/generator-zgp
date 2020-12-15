const baseUrl = 'https://test.mini.brecovered.cn/api/'

const http = ({
	url = '',
	data = {},
	header = {
		'content-type': 'application/json'
	},
	loading = false,
	loginFlag = true,
	...other
} = {}) => {
	let params = Object.assign(data)
	return new Promise((resolve, reject) => {
		if (loading) {
			wx.showLoading({
				title: '加载中...',
				mask: true
			});
		}
		wx.request({
			url: getUrl(url),
			data: params,
			header,
			...other,
			success: (res) => {
				if (loginFlag) {
					if (res.data.code_status === 0) {
						resolve(res.data);
					} else if (res.data.msg === '请先登录') {
						wx.clearStorage({
							success: (res) => {
								wx.navigateTo({
									url: '/pages/login/login',
								})
								wx.showToast({
									title: '请登录',
									icon: 'none'
								})
							}
						})
					} else if (res.data.msg === '用户信息不存在') {
						wx.clearStorage({
							success: (res) => {
								wx.navigateTo({
									url: '/pages/login/login',
								})
								wx.showToast({
									title: '请登录',
									icon: 'none'
								})
							}
						})
					} else {
						reject(res);
					}
				} else {
					if (res.data.code_status === 0) {
						resolve(res.data);
					} else {
						reject(res);
					}
				}
			},
			fail: (err) => {
				wx.showToast({
					title: "网络错误",
					icon: 'none'
				})
			},
			complete: (res) => {
				if (loading) {
					loading = false;
					wx.hideLoading();
				}
			}
		})
	})
}

const getUrl = (url) => {
	if (url.indexOf('://') == -1) {
		url = baseUrl + url;
	}
	return url
}

// get方法
const _get = (url, data = {}, loading = false, header = {
	'content-type': 'application/json'
}) => {
	return http({
		url,
		data,
		header,
		loading
	})
}

const _post = (url, data = {}, loading = false, header = {
	'content-type': 'application/json'
}) => {
	return http({
		url,
		data,
		header,
		method: 'post',
		loading
	})
}

const _put = (url, data = {}, loading = false, header = {
	'content-type': 'application/json'
}) => {
	return http({
		url,
		data,
		header,
		method: 'put',
		loading
	})
}

const _delete = (url, data = {}, loading = false, header = {
	'content-type': 'application/json'
}) => {
	return http({
		url,
		data,
		header,
		method: 'put',
		loading
	})
}

module.exports = {
	baseUrl,
	http,
	_get,
	_post,
	_put,
	_delete
}