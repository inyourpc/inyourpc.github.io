window["GD_OPTIONS"] = {
	"debug": false, // Enable debugging console. This will set a value in local storage as well, remove this value if you don't want debugging at all. You can also call it by running gdsdk.openConsole() within your browser console.
	"gameId": "d65cd39da0974753b7328221c33bfcf0", // Your gameId which is unique for each one of your games; can be found at your Gamedistribution.com account.
	"advertisementSettings": {
		"debug": false, // Enable IMA SDK debugging.
		"autoplay": false, // Enable auto start of pre-roll advertisement. Will be disabled when auto play is not supported.
		"responsive": true, // Enable advertisement responsiveness, otherwise given width and height will be used.
	},
	"onEvent": function(event) {
		switch (event.name) {
			case "SDK_GAME_START":
				console.log('SDK_GAME_START');
				levelSelectionScreen();
				break;
				case "SDK_GAME_PAUSE":
				console.log('PAUSED');
				break;
				case "SDK_READY":
				console.log('SDK_READY');
				break;
			case "SDK_ERROR":
				console.log('SDK_ERROR');
				break;
			case "SDK_GDPR_TRACKING":
				//document.querySelector("#status").innerHTML = "GDPR TRACKING";
				break;
			case "SDK_GDPR_TARGETING":
				//document.querySelector("#status").innerHTML = "GDPR TARGETING";
				break;
			case "SDK_GDPR_THIRD_PARTY":
				//document.querySelector("#status").innerHTML = "GDPR THIRD PARTY";
				break;
		}
	},
};
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = '//html5.api.gamedistribution.com/main.min.js';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'gamedistribution-jssdk'));

