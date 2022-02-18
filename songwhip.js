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

	/**
	* @param {string[]} uris
	*/
	async function getSongwhip(uris) {
		const SW_URL = "https://songwhip.com";
		const uri = uris[0];
		const data = await Spicetify.CosmosAsync.post(SW_URL, JSON.stringify({ url: uri }));

		console.log("Got " + data.url);
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
