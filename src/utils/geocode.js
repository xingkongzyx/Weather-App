const request = require("request");

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1Ijoia2V2aW4yMzQ1MSIsImEiOiJjazZkcmo3MW8xcTl3M3FwYmhmZHgwYXhzIn0.V3kvcVVfiG65s7Pj5kPSHQ&limit=1";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			// callback will receive two argus, 如果有error,则data为undefind,如果没有error,则error为undefined
			// callback的第一个参数为string, 传递给callback让其在下面定义时自己处理
			callback("Unable to connect to location service", { undefined });
		} else if (body.features.length === 0) {
			callback("Unable to find location, try another search!", {
				undefined
			});
		} else {
			// 没有error的话，提取数据然后调用callback
			const data = body;
			const longitude = data.features[0].center[0];
			const latitude = data.features[0].center[1];
			const location = data.features[0].place_name;

			callback(undefined, { longitude, latitude, location });
		}
	});
};

module.exports = geocode;
