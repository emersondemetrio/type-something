const init = () => {
	let inProgress = false;
	const input = document.getElementById('i');
	const button = document.getElementById('b');
	const result = document.getElementById('p');

	const write = (text, replace = false) => {
		if (!replace) return (result.innerHTML += text);

		return (result.innerHTML = text);
	};

	const delay = (time) => new Promise((go) => setTimeout(() => go(), time));

	const clear = () => {
		write('', true);
	};

	const writeAll = async (text) => {
		for (let l of text.split('')) {
			if (l === ' ') {
				l = '  ';
			}
			write(l);

			await delay(100);
		}
	};

	const handleEvent = async () => {
		if (inProgress) return;
		inProgress = true;
		button.disabled = true;
		clear();
		await writeAll(input.value || "It's quiet here.");
		button.disabled = false;
		inProgress = false;
	};

	button.addEventListener('click', handleEvent);
	input.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			handleEvent();
		}
	});
};
