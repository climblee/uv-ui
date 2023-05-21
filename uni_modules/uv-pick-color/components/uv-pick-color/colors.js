/**
 * hsb 转 rgb
 * @param {Object} hsb 颜色模式  H(hues)表示色相，S(saturation)表示饱和度，B（brightness）表示亮度
 */
export function hsbToRgb(hsb) {
	let rgb = {};
	let h = hsb.h;
	let s = hsb.s * 255 / 100;
	let v = hsb.b * 255 / 100;
	if (s == 0) {
		rgb.r = rgb.g = rgb.b = v;
	} else {
		let t1 = v;
		let t2 = ((255 - s) * v) / 255;
		let t3 = ((t1 - t2) * (h % 60)) / 60;
		if (h == 360) h = 0;
		if (h < 60) {
			rgb.r = t1;
			rgb.b = t2;
			rgb.g = t2 + t3;
		} else if (h < 120) {
			rgb.g = t1;
			rgb.b = t2;
			rgb.r = t1 - t3;
		} else if (h < 180) {
			rgb.g = t1;
			rgb.r = t2;
			rgb.b = t2 + t3;
		} else if (h < 240) {
			rgb.b = t1;
			rgb.r = t2;
			rgb.g = t1 - t3;
		} else if (h < 300) {
			rgb.b = t1;
			rgb.g = t2;
			rgb.r = t2 + t3;
		} else if (h < 360) {
			rgb.r = t1;
			rgb.g = t2;
			rgb.b = t1 - t3;
		} else {
			rgb.r = 0;
			rgb.g = 0;
			rgb.b = 0;
		}
	}
	return {
		r: Math.round(rgb.r),
		g: Math.round(rgb.g),
		b: Math.round(rgb.b)
	};
}
/**
 * rgb转hsb
 * @param {Object} rgb 颜色rgb值
 */
export function rgbToHsb(rgb) {
	let hsb = {
		h: 0,
		s: 0,
		b: 0
	};
	let min = Math.min(rgb.r, rgb.g, rgb.b);
	let max = Math.max(rgb.r, rgb.g, rgb.b);
	let delta = max - min;
	hsb.b = max;
	hsb.s = max != 0 ? 255 * delta / max : 0;
	if (hsb.s != 0) {
		if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
		else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
		else hsb.h = 4 + (rgb.r - rgb.g) / delta;
	} else hsb.h = -1;
	hsb.h *= 60;
	if (hsb.h < 0) hsb.h = 0;
	hsb.s *= 100 / 255;
	hsb.b *= 100 / 255;
	return hsb;
}
/**
 * rgb 转 二进制 hex
 * @param {Object} rgb
 */
export function rgbToHex(rgb) {
	let hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
	hex.map(function(str, i) {
		if (str.length == 1) {
			hex[i] = '0' + str;
		}
	});
	return hex.join('');
}
//预制颜色
export const colorList = [{
	r: 60,
	g: 156,
	b: 255,
	a: 1
}, {
	r: 245,
	g: 108,
	b: 108,
	a: 1
}, {
	r: 249,
	g: 174,
	b: 61,
	a: 1
}, {
	r: 90,
	g: 199,
	b: 37,
	a: 1
}, {
	r: 144,
	g: 147,
	b: 153,
	a: 1
}, {
	r: 48,
	g: 49,
	b: 51,
	a: 1
}, {
	r: 233,
	g: 30,
	b: 99,
	a: 1
}, {
	r: 156,
	g: 39,
	b: 176,
	a: 1
}, {
	r: 103,
	g: 58,
	b: 183,
	a: 1
}, {
	r: 63,
	g: 81,
	b: 181,
	a: 1
}, {
	r: 0,
	g: 188,
	b: 212,
	a: 1
}, {
	r: 0,
	g: 150,
	b: 136,
	a: 1
}, {
	r: 139,
	g: 195,
	b: 74,
	a: 1
}, {
	r: 205,
	g: 220,
	b: 57,
	a: 1
}, {
	r: 255,
	g: 235,
	b: 59,
	a: 1
}, {
	r: 255,
	g: 193,
	b: 7,
	a: 1
}, {
	r: 255,
	g: 152,
	b: 0,
	a: 1
}, {
	r: 255,
	g: 87,
	b: 34,
	a: 1
}, {
	r: 121,
	g: 85,
	b: 72,
	a: 1
}, {
	r: 158,
	g: 158,
	b: 158,
	a: 1
}, {
	r: 0,
	g: 0,
	b: 0,
	a: 0.5
}, {
	r: 0,
	g: 0,
	b: 0,
	a: 0
}]