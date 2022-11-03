function visitLink(path) {
	let count = Number(localStorage.getItem(path) || 0);
	count++;
	localStorage.setItem(path, count)
}

function viewResults() {
	const existing = document.getElementById('output');
	if (existing) {
		existing.remove();
	}
	const ul = document.createElement('ul');
	ul.id = 'output';
	let index = 0;

	while (index >= 0) {
		const key = localStorage.key(index);
		if (key === null) {
			break;
		}
		index++;
		const count = localStorage.getItem(key);
		const li = document.createElement('li');
		li.innerHTML = `You visited ${key} ${count} times(s)`;
		ul.appendChild(li);
	}
	const content = document.getElementById('content');
	content.appendChild(ul);
	localStorage.clear();
}
