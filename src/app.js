const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000
const hbs = require("hbs");
const app = express();

// The functions will be used from utils folder
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
// which template template we want to install and use
// app.set() 接收key-value pair
app.set("view engine", "hbs");
app.set("views", viewsPath);
// 用于使用partial
hbs.registerPartials(partialPath);

// Setup static directory to serve
// app.use()是用于定制server的,用于决定serve up哪个folder
app.use(express.static(publicDirectoryPath));
console.log(publicDirectoryPath);

app.get("", (req, res) => {
	// 使用render, nodejs先get corresponding view, 然后转换成HTML page, 最后再提供给requester
	res.render("index", {
		title: "Weather",
		name: "Yuxuan Zhu"
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Yuxuan Zhu"
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
		title: "Help page",
		name: "Yuxuan Zhu"
	});
});

app.get("/weather", (req, res) => {
	const address = req.query.address;

	// 如果query string中没有包含address
	if (!address) {
		return res.send({ errorMes: "Please provide the search item" });
	}

	// 如果有值把传递的address
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		// 如果有error返回的就会是 (errorString, undifined)
		if (error) {
			return res.send({ error });
		}

		// If geocode() works well, we will call forecast()
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				location,
				forecast: forecastData
			});
		});
	});
});

// 满足 /help/... pattern的route将运行下面的template
app.get("/help/*", (req, res) => {
	res.render("error", {
		errorText: "Help Article not found",
		title: "Error",
		name: "Yuxuan Zhu"
	});
});

// 除了以上的所有其他route, 用wild card *(通配符表示), 运行下方的route
app.get("*", (req, res) => {
	res.render("error", {
		errorText: "Page Not Found",
		title: "Error",
		name: "Yuxuan Zhu"
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
