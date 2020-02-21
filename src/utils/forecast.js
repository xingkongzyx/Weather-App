const request = require("request");

// API KEY: b7c55d1b245dd210c1dcb8d12f331cb0
// 在正常的url后加入query string来得到我们需要的信息, 例如:
// url?key=value&otherkey=othervalue&thirdkey=thirdvalue
const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/b7c55d1b245dd210c1dcb8d12f331cb0/${latitude},${longitude}?lang=zh&units=si`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
            const currentlyData = body.currently;
            const visibility = currentlyData.visibility;
			const temperature = currentlyData.temperature;
			const precipProbability = currentlyData.precipProbability;
			const summary = body.daily.data[0].summary;
			callback(
				undefined,
				`${summary} 现在是 ${temperature} 摄氏度. 能见度为${visibility}. 今天下雨的概率是 ${precipProbability}%.`
			);
		}
	});
};

module.exports = forecast;
