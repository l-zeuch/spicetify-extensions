//@ts-check

// NAME: songwhip.js
// AUTHOR: l-zeuch
// DESCRIPTION: Get the song/artist URL from https://songwhip.com
// LICENSE: BSD 3-Clause License

(function Songwhip() {
	const SW_TEXT = 'Songwhip!';
	const SW_URL = 'https://songwhip.com';

	if (!document.body.classList.contains('songwhip-css')) {
		let styleSheet = document.createElement('style');

		styleSheet.innerHTML = `.sw-par {
		clear: right !important;
		margin-bottom: 1em !important;
		}`;

		document.body.appendChild(styleSheet);
		document.body.classList.add('songwhip-css');
	}

	const { ContextMenu, CosmosAsync, Player, PopupModal, URI } = Spicetify;
	if (!ContextMenu || !CosmosAsync || !Player || !PopupModal || !URI) {
		setTimeout(Songwhip, 1000);
		return;
	}

	function error() {
		PopupModal.display({
			title: 'Error',
			content: 'Failed fetching Songwhip :(',
		});
	}

	/**
	 * Fetch https://songwhip.com and call to display modal once resolved.
	 *
	 * @param {string[]} uris
	 */
	async function getSongwhip(uris) {
		const body = JSON.stringify({ url: uris[0] });

		const data = await CosmosAsync.post(SW_URL, body);
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

		PopupModal.display({ title, content });
	}

	/**
	 *	Decide whether to add the context menu button.
	 *	Only add for tracks and artists.
	 *
	 *	@param	 {string[]} uris
	 *	@returns {boolean}
	 */
	function shouldAddContextMenu(uris) {
		if (uris.length > 1) {
			return false;
		}

		const uri = URI.fromString(uris[0]);
		return uri.type === URI.Type.TRACK || uri.type === URI.Type.ARTIST;
	}

	// Register the button thingy
	const contextMenu = new ContextMenu.Item(SW_TEXT, getSongwhip, shouldAddContextMenu);
	contextMenu.register();
})();
