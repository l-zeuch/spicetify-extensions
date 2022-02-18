//@ts-check

// NAME: songwhip.js
// AUTHOR: l-zeuch
// DESCRIPTION: Get the song/artist URL from https://songwhip.com

(function Songwhip() {
	const SW_TEXT = "Songwhip!";

	if (!Spicetify.Player.data) {
		setTimeout(Songwhip, 1000);
		return;
	}

	console.log("loaded sw");

	/**
	* @param {string[]} uris
	*/
	async function getSongwhip(uris) {
		const SW_URL = "https://songwhip.com";
		const uri = uris[0];

		fetch(SW_URL, {
			method: 'POST',
			body: JSON.stringify({ url: uri }),
		})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(error => console.log(error));
	}

	/**
	* @param {string[]} uris
	* @returns {boolean}
	*/
	function shouldAddContextMenu(uris) {
		if (uris.length > 1) {
			return false;
		}

		const uri = uris[0];
		const uriObj = Spicetify.URI.fromString(uri);
		if (uriObj.type === Spicetify.URI.Type.TRACK) {
			this.name = SW_TEXT;
			return true;
		}

		if (uriObj.type === Spicetify.URI.Type.ARTIST) {
			this.name = SW_TEXT;
			return true;
		}

		return false;
	}

	const cntxMenu = new Spicetify.ContextMenu.Item(SW_TEXT, getSongwhip, shouldAddContextMenu);
	cntxMenu.register();
})();
