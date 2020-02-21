console.log("Client side javascript file is loaded!");

const form = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", () => {
	event.preventDefault();
	const address = document.querySelector("input").value;

	// Show load message when submitting the form
	messageOne.innerText = "Loading Weather...";
	messageTwo.innerText = "";
	const url = `/weather?address=${address}`;

	fetch(url).then(response => {
		response.json().then(data => {
			if (data.error) {
				messageOne.innerText = data.error;
			} else {
				messageOne.innerText = data.location;
				messageTwo.innerText = data.forecast;
            }
            setTimeout(() => {
                document.querySelector("input").value = "";
                messageOne.textContent = "";
                messageTwo.textContent = "";
            }, 5000);
		});
	});

	
});
