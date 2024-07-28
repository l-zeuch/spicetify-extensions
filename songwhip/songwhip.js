//@ts-check

// NAME: songwhip.js
// AUTHOR: l-zeuch
// DESCRIPTION: Get the song/artist URL from https://songwhip.com
// LICENSE: BSD 3-Clause License

(function Songwhip() {
	const SW_TEXT = 'Songwhip!';
	const SW_URL = 'https://songwhip.com/api';
	const SW_BASE_URL = 'https://songwhip.com';
	const SW_CLASS = 'songwhip-css';
	const SW_PAR_CLASS = 'sw-par';
	const COUNTRY = 'US';
	const ERROR_TITLE = 'Error';
	const ERROR_CONTENT = 'Failed fetching Songwhip :(';
	const STYLE_CONTENT = `
		.${SW_PAR_CLASS} {
			clear: right !important;
			margin-bottom: 1em !important;
		}
	`;

	if (!document.body.classList.contains(SW_CLASS)) {
		let styleSheet = document.createElement('style');
		styleSheet.innerHTML = STYLE_CONTENT;
		document.body.appendChild(styleSheet);
		document.body.classList.add(SW_CLASS);
	}

	const { ContextMenu, CosmosAsync, Player, PopupModal, URI } = Spicetify;
	if (!ContextMenu || !CosmosAsync || !Player || !PopupModal || !URI) {
		setTimeout(Songwhip, 1000);
		return;
	}

	function displayError() {
		PopupModal.display({ title: ERROR_TITLE, content: ERROR_CONTENT });
	}

	/**
	 * Fetch https://songwhip.com and call to display modal once resolved.
	 *
	 * @param {string[]} uris
	 */
	async function getSongwhip(uris) {
		const body = JSON.stringify({ url: uris[0], country: COUNTRY });

		const data = await CosmosAsync.post(SW_URL, body);
		if (!data || data.status !== 'success') {
			displayError();
			return;
		}

		const SWurl = SW_BASE_URL + data.data.item.url;
		await Spicetify.Platform.ClipboardAPI.copy(SWurl);
		displayModal(data);
	}

	/**
	 * Display a popup modal.
	 *
	 * @param {object} data
	 */
	function displayModal(data) {
		const item = data.data.item;
		const url = SW_BASE_URL + item.url;
		let title, content;

		if (item.type === 'artist') {
			title = `<a href="${url}">${item.name}</a>`;
			content = `
				<p class="${SW_PAR_CLASS}">${url}</p>
				<p class="${SW_PAR_CLASS}">${item.description ?? 'No description.'}</p>
			`;
		} else if (item.type === 'track') {
			title = `<a href="${url}">${item.name} - ${item.artists.map(a => a.name).join(', ')}</a>`;
			content = `
				<p class="${SW_PAR_CLASS}">${url}</p>
				<p class="${SW_PAR_CLASS}">${item.artists[0].description ?? 'No description.'}</p>
			`;
		} else {
			title = ERROR_TITLE;
			content = ERROR_CONTENT;
		}

		PopupModal.display({ title, content });
	}

	/**
	 * Decide whether to add the context menu button.
	 * Only add for tracks and artists.
	 *
	 * @param {string[]} uris
	 * @returns {boolean}
	 */
	function shouldAddContextMenu(uris) {
		if (uris.length > 1) {
			return false;
		}

		const uri = URI.fromString(uris[0]);
		return uri.type === URI.Type.TRACK || uri.type === URI.Type.ARTIST;
	}

	// Register the button
	const contextMenu = new ContextMenu.Item(SW_TEXT, getSongwhip, shouldAddContextMenu);
	contextMenu.register();
})();
