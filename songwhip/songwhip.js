//@ts-check

// NAME: songwhip.js
// AUTHOR: l-zeuch
// DESCRIPTION: Get the song/artist URL from https://songwhip.com
// LICENSE: BSD 3-Clause License

(function Songwhip() {
	const SW_TEXT = 'Songwhip!';
	const SW_URL = 'https://songwhip.com';

	if (!document.body.classList.contains('songwhip-css')) {
		var styleSheet = document.createElement('style');

		styleSheet.innerHTML = `.sw-par {
		clear: right !important;
		margin-bottom: 1em !important;
		}`;

		document.body.appendChild(styleSheet);
		document.body.classList.add('songwhip-css');
	}

	if (!(Spicetify.PopupModal && Spicetify.CosmosAsync && Spicetify.Player.data && Spicetify.URI)) {
		setTimeout(Songwhip, 1000);
		return;
	}

	function error() {
		Spicetify.PopupModal.display({
			title: 'Error',
			content: 'Failed fetching Songwhip :(',
		});
	}

	/**
	 * Fetch https://songwhip.com and call to display modal.
	 *
	 * @param {string[]} uris
	 */
	async function getSongwhip(uris) {
		const body = JSON.stringify({ url: uris[0] });

		const data = await Spicetify.CosmosAsync.post(SW_URL, body);
		if (!data) {
			error();
			return;
		}

		displayModal(data);
	}

	/**
	 * Display a popup modal.
	 *
	 * @param {object} data
	 */
	function displayModal(data) {
		const title = `<a href=${data.url}>${data.name} -- ${data.artists.map((a) => a.name).join(', ')}</a>`;
		const content = `<p class="sw-par">${data.url}</p>
		<p class="sw-par">${data.artists[0].description ?? 'No description.'}</p>
		`;

		Spicetify.PopupModal.display({
			title: title,
			content: content,
		});
	}

	/**
	 *  Decide whether to add the context menu button.
	 * Only add for tracks and artists.
	 *
	 *  @param   {string[]} uris
	 *  @returns {boolean}
	 */
	function shouldAddContextMenu(uris) {
		if (uris.length > 1) {
			return false;
		}

		const uri = Spicetify.URI.fromString(uris[0]);
		return uri.type === Spicetify.URI.Type.TRACK || uri.type === Spicetify.URI.Type.ARTIST;
	}

	// Register the button thingy
	const contextMenu = new Spicetify.ContextMenu.Item(SW_TEXT, getSongwhip, shouldAddContextMenu);
	contextMenu.register();
})();
