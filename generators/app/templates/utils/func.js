/** 
 * 和PHP一样的时间戳格式化函数 
 * @param {string} format 格式 
 * @param {int} timestamp 要格式化的时间 默认为当前时间(如果传递时间戳要传递秒级时间戳)
 * @return {string}   格式化的时间字符串 
 */
let dateFormat = function(format, timestamp) {
	let a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
	let pad = function(n, c) {
		if ((n = n + "").length < c) {
			return new Array(++c - n.length).join("0") + n;
		} else {
			return n;
		}
	};
	let txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let txt_ordin = {
		1: "st",
		2: "nd",
		3: "rd",
		21: "st",
		22: "nd",
		23: "rd",
		31: "st"
	};
	let txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September",
		"October", "November", "December"
	];
	let f = {
		// Day 
		d: function() {
			return pad(f.j(), 2)
		},
		D: function() {
			return f.l().substr(0, 3)
		},
		j: function() {
			return jsdate.getDate()
		},
		l: function() {
			return txt_weekdays[f.w()]
		},
		N: function() {
			return f.w() + 1
		},
		S: function() {
			return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
		},
		w: function() {
			return jsdate.getDay()
		},
		z: function() {
			return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
		},

		// Week 
		W: function() {
			let a = f.z(),
				b = 364 + f.L() - a;
			let nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
			if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
				return 1;
			} else {
				if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
					nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
					return date("W", Math.round(nd2.getTime() / 1000));
				} else {
					return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
				}
			}
		},

		// Month 
		F: function() {
			return txt_months[f.n()]
		},
		m: function() {
			return pad(f.n(), 2)
		},
		M: function() {
			return f.F().substr(0, 3)
		},
		n: function() {
			return jsdate.getMonth() + 1
		},
		t: function() {
			let n;
			if ((n = jsdate.getMonth() + 1) == 2) {
				return 28 + f.L();
			} else {
				if (n & 1 && n < 8 || !(n & 1) && n > 7) {
					return 31;
				} else {
					return 30;
				}
			}
		},

		// Year 
		L: function() {
			let y = f.Y();
			return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
		},
		//o not supported yet 
		Y: function() {
			return jsdate.getFullYear()
		},
		y: function() {
			return (jsdate.getFullYear() + "").slice(2)
		},

		// Time 
		a: function() {
			return jsdate.getHours() > 11 ? "pm" : "am"
		},
		A: function() {
			return f.a().toUpperCase()
		},
		B: function() {
			// peter paul koch: 
			let off = (jsdate.getTimezoneOffset() + 60) * 60;
			let theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
			let beat = Math.floor(theSeconds / 86.4);
			if (beat > 1000) beat -= 1000;
			if (beat < 0) beat += 1000;
			if ((String(beat)).length == 1) beat = "00" + beat;
			if ((String(beat)).length == 2) beat = "0" + beat;
			return beat;
		},
		g: function() {
			return jsdate.getHours() % 12 || 12
		},
		G: function() {
			return jsdate.getHours()
		},
		h: function() {
			return pad(f.g(), 2)
		},
		H: function() {
			return pad(jsdate.getHours(), 2)
		},
		i: function() {
			return pad(jsdate.getMinutes(), 2)
		},
		s: function() {
			return pad(jsdate.getSeconds(), 2)
		},
		//u not supported yet 

		// Timezone 
		//e not supported yet 
		//I not supported yet 
		O: function() {
			let t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
			if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
			else t = "+" + t;
			return t;
		},
		P: function() {
			let O = f.O();
			return (O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		//T not supported yet 
		//Z not supported yet 

		// Full Date/Time 
		c: function() {
			return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
		},
		//r not supported yet 
		U: function() {
			return Math.round(jsdate.getTime() / 1000)
		}
	};

	return format.replace(/[\ ]?([a-zA-Z])/g, function(t, s) {
		if (t != s) {
			// escaped 
			ret = s;
		} else if (f[s]) {
			// a date function exists 
			ret = f[s]();
		} else {
			// nothing special 
			ret = s;
		}
		return ret;
	});
}

/**
 * 
 * @param {Number} num 获取多少天之后的日期
 */
let GetDate = function(num = 0) {
	let dd = new Date();
	dd.setDate(dd.getDate() + num); //获取num天后的日期
	let y = dd.getFullYear();
	let m = dd.getMonth() + 1; //获取当前月份的日期
	let d = dd.getDate();
	if (m >= 1 && m <= 9) {
		m = "0" + m;
	}
	if (d >= 0 && d <= 9) {
		d = "0" + d;
	}
	return y + "-" + m + "-" + d;
}

/**
 * 
 * @param {Object} obj 需要判断的对象
 */
let isObject = function(obj) {
	if (Object.prototype.toString.call(obj).toLowerCase() === '[object object]') {
		return true;
	} else {
		return false;
	}
}
/**
 * 
 * @param {Object} obj 需要判断的对象
 */
let isEmptyObject = function(obj) {
	for (let key in obj) {
		return false
	};
	return true
}

/**
 * 另外一个格式化时间函数
 * 时间戳格式化日期，一般后台给的都是秒级的时间戳
 * timestamp:时间戳
 * separator:日期间隔符 默认 -
 * timeS:时分秒间隔符 默认 :
 * flag:是否携带 时分秒 默认 false
 */
function formatTime(timestamp, separator = '-', flag = false, timeS = ':') {
	let str = '',
		Y, M, D, h, m, s;
	let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + separator;
	M = autoChange(date.getMonth() + 1) + separator;
	D = autoChange(date.getDate());
	str = Y + M + D;
	if (flag) {
		h = autoChange(date.getHours()) + timeS;
		m = autoChange(date.getMinutes()) + timeS;
		s = autoChange(date.getSeconds());
		let timeStr = h + m + s;
		str += " ";
		str += timeStr;
	}
	return str;
}
/**
 * 自动补零
 * @param {Number} num 
 */
function autoChange(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return num;
	}
}
/**
 * 验证手机号是否正确
 * @param {String} s 手机号
 */
let isMobile = function(s) {
	let patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!patrn.exec(s))
		return false;
	return true;
}
/**
 * 判断是否是正确的身份证号码
 * @param {String} StrNo 
 */
function isIDCard(StrNo) {
	StrNo = StrNo.toString()
	if (StrNo.length == 18) {
		let a, b, c
		if (!isInteger(StrNo.substr(0, 17)))
			return false;

		a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
		a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
		a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
		a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
		a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
		a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
		b = a % 11;

		if (b == 2)
			c = StrNo.substr(17, 1).toUpperCase(); //转为大写X 
		else
			c = parseInt(StrNo.substr(17, 1));

		switch (b) {
			case 0:
				if (c != 1)
					return false;
				break;
			case 1:
				if (c != 0)
					return false;
				break;
			case 2:
				if (c != "X")
					return false;
				break;
			case 3:
				if (c != 9)
					return false;
				break;
			case 4:
				if (c != 8)
					return false;
				break;
			case 5:
				if (c != 7)
					return false;
				break;
			case 6:
				if (c != 6)
					return false;
				break;
			case 7:
				if (c != 5)
					return false;
				break;
			case 8:
				if (c != 4)
					return false;
				break;
			case 9:
				if (c != 3)
					return false;
				break;
			case 10:
				if (c != 2)
					return false;
		}
	} else //15位身份证号 
	{
		if (!isInteger(StrNo))
			return false;
	}

	switch (StrNo.length) {
		case 15:
			if (isValidDate("19" + StrNo.substr(6, 2), StrNo.substr(8, 2), StrNo.substr(10, 2)))
				return true;
			else
				return false;
		case 18:
			if (isValidDate(StrNo.substr(6, 4), StrNo.substr(10, 2), StrNo.substr(12, 2)))
				return true;
			else
				return false;
	}

	return false
}
/**
 * 是否是整型
 * @param {Any} str 
 */
function isInteger(str) {
	if (/[^\d]+$/.test(str)) {
		return false;
	}
	return true;
}
/**
 * 是否和当天的日期是一样的
 * @param {*} iY 年
 * @param {*} iM 月
 * @param {*} iD 日
 */
function isValidDate(iY, iM, iD) {
	let a = new Date(iY, iM - 1, iD);
	let y = a.getFullYear();
	let m = a.getMonth() + 1;
	let d = a.getDate();
	if (y != iY || m != iM || d != iD)
		return false;
	return true
}
/**
 * 全局分享控制
 * @param {Object} param 
 */
function _share({
	title = '憧橙',
	imageUrl = 'https://mini.brecovered.cn/upload_files/mini/logo-share.jpg',
	path = '/pages/index/index',
	content = '康复之路，憧橙伴您同行',
	success = () => {},
	fail = () => {}
} = {}) {
	return {
		title,
		imageUrl,
		path,
		success: (res) => {
			success(res)
		},
		fail: (err) => {
			fail(err)
		}
	}
}

/**
 * 去除字符串中的 html 标签
 * @param {*} param
 */
function strip_tags_all({
	str = '',
	spaceFlag = false,
	space = "&nbsp;"
}) {
	let tagsReg = new RegExp('<\/{0,1}.*?>', 'gm');
	str = str.replace(tagsReg, '');
	if (spaceFlag) { //去除空格
		let spaceReg = new RegExp(space, 'gm')
		str = str.replace(spaceReg, '');
	}
	return str;
}

module.exports = {
	dateFormat,
	formatTime,
	GetDate,
	isObject,
	isEmptyObject,
	isMobile,
	isIDCard,
	isInteger,
	isValidDate,
	_share,
	strip_tags_all
};
