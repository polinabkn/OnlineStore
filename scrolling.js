step = 0;

function scrollTop() {
	step > 0 ? step -= 1 : step = step;
}
function scrollBottom() {
	step < document.querySelectorAll("article").length ? step += 1 : step = step;
}

function scrollToStep(st) {
	step = st;
	window.scrollTo({
	  top: window.innerHeight*st, 
	  left: 0, 
	  behavior: 'smooth' 
	});
}

function smooth(ev) {
	ev.preventDefault();
	ev.stopPropagation();
	ev.deltaY < 0 ? scrollTop() : scrollBottom();
	window.scrollTo({
	  top: window.innerHeight*step, 
	  left: 0, 
	  behavior: 'smooth' 
	});
	console.log(window.innerHeight*step);
}

onScroll = throttle(smooth, 800);

window.addEventListener("wheel", onScroll);