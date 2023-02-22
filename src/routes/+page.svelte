<script>
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';

	let gaming = false;
	let uid = '';
	let pongs = 0;
	let interval;
	let b;
	let fin;
	let p;
	let px, py;
	//Speed and direction
	var pxSpeed = 1;
	var pySpeed = 1;

	onDestroy(() => {
		clearInterval(interval);
	});
	onMount(async () => {
		fin = document.querySelector('#fininity');
		b = document.querySelector('#egg');
		const { width: bWidth, height: bHeight } = b.getBoundingClientRect();
		// 	const i = Math.floor(Math.random() * (window.innerWidth - bWidth)) + 1,
		// 	j = Math.floor(Math.random() * (window.innerHeight - bHeight)) + 1;

		// b.style.left = i + 'px';
		// b.style.top = j + 'px';
		//Initial position
		p = document.querySelector('#pac');
		px = p?.getBoundingClientRect().left;
		py = p?.getBoundingClientRect().top;
	});
	function chase() {
		//Move the logo every 10 milliseconds
		interval = setInterval(() => {
			if (
				p.getBoundingClientRect().left - b.getBoundingClientRect().left > 5 ||
				p.getBoundingClientRect().left - b.getBoundingClientRect().left < -5 ||
				p.getBoundingClientRect().top - b.getBoundingClientRect().top > 5 ||
				p.getBoundingClientRect().top - b.getBoundingClientRect().top < -5
			) {
				movePac();
				// console.log(p.getBoundingClientRect().left - b.getBoundingClientRect().left);
				// console.log(p.getBoundingClientRect().top - b.getBoundingClientRect().top);
			}
		}, 10);
	}

	function movePac() {
		//Update position

		if (px < b?.getBoundingClientRect().left) {
			px += pxSpeed;
			// angle > 0 ? angle-- : angle++;
		} else if (px != b?.getBoundingClientRect().left) {
			px -= pxSpeed;
			// angle > 180 ? angle-- : angle++;
		}

		if (py < b?.getBoundingClientRect().top) {
			py += pySpeed;
			// angle > 90 ? angle-- : angle++;
		} else if (py != b?.getBoundingClientRect().top) {
			py -= pySpeed;
			// angle > 270 ? angle-- : angle++;
		}
		// d.style.top = b?.getBoundingClientRect().top + b.offsetHeight / 2 + 'px';
		// d.style.left = b?.getBoundingClientRect().left + b.offsetHeight / 2 + 'px';

		let dx = px - b?.getBoundingClientRect().left;
		let dy = b?.getBoundingClientRect().top - py;
		let angle = (Math.atan2(dx, dy) * 180) / Math.PI;
		//Set the new position of the logo
		// if (angle >= 360) angle = 0;

		p.style.left = px + 'px';
		p.style.top = py + 'px';
		p.style.rotate = `${angle + 90}deg`;
	}
	function dvdbounce() {
		gaming = true;
		// document.getElementById('bg1').parentElement.removeChild(document.getElementById('bg1'));
		// document.getElementById('bg2').parentElement.removeChild(document.getElementById('bg2'));
		document.getElementById('bg1').classList.add('hidden');
		document.getElementById('bg2').classList.add('hidden');
		document.getElementById('start').parentElement.removeChild(document.getElementById('start'));

		//Initial position
		var x = b?.getBoundingClientRect().left;
		var y = b?.getBoundingClientRect().top;

		//Speed and direction
		var xSpeed = 5;
		var ySpeed = 5;
		var scrollSpeed = 1.3;

		//Move the logo every 10 milliseconds
		interval = setInterval(() => {
			if (b && document.getElementById('counter') && document.getElementById('countegg')) {
				moveLogo();
			} else {
				clearInterval(interval);
			}
		}, 10);

		function moveLogo() {
			//Update position
			x += xSpeed;
			y += ySpeed;

			let differencePercent =
				document.documentElement.clientHeight / document.documentElement.scrollHeight;
			let scrollBarHeight = document.documentElement.clientHeight * differencePercent;

			// NOTE: dynamically decrease scrollBar size based on how far down you scrolled, causes jittering issues on Safari
			// fin.style.height = window.scrollY / scrollSpeed + 'px';

			// Check for edges (right / left)
			if (x + b.clientWidth > window.innerWidth || x < 0) {
				// check if it's the right edge
				if (x + b.clientWidth > window.innerWidth) {
					let scrollBarTop = window.scrollY * differencePercent;
					let scrollBarBottom = scrollBarTop + scrollBarHeight;
					if (scrollBarTop > y + b.clientHeight || scrollBarBottom < y) {
						xSpeed = -xSpeed;
						uid ? collect() : (pongs = 0);
						fin.style.height = '0px';
						xSpeed = 5;
						ySpeed = 5;
						scrollSpeed = 1.3;
						document.getElementById('counter').style.color = 'red';
						document.getElementById('counter').style.scale = scrollSpeed + ' ' + scrollSpeed;
						// reset position
						setTimeout(() => {
							b.style.top = '50%';
							b.style.left = '50%';
							y = b?.getBoundingClientRect().top;
							x = b?.getBoundingClientRect().left;
						}, 100);
					} else {
						pongs++;
						if (pongs == 5) {
							document.getElementById('bg3').classList.remove('hidden');
							document.getElementById('bg4').classList.remove('hidden');
							// document.getElementById('bg1').style.animation =
							// 	'sweep 1.5s ease-in-out infinite alternate';
							// document.getElementById('bg2').style.animation =
							// 	'sweep 1.5s ease-in-out infinite alternate-reverse';
							setTimeout(() => {
								document.getElementById('bg3').classList.add('hidden');
								document.getElementById('bg4').classList.add('hidden');
							}, 1500);
							p.style.opacity = '1';
							xSpeed = 5;
							ySpeed = 5;
							chase();
						}
						// xSpeed += 0.5;
						ySpeed *= 1.15;
						xSpeed *= 1.15;
						// ySpeed += 0.5;
						scrollSpeed += 0.1;
						document.getElementById('counter').style.color = 'white';
						document.getElementById('counter').style.scale = scrollSpeed + ' ' + scrollSpeed;
						fin.style.height = ((pongs / 5) * window.innerHeight) / 10 + 'px';
					}
				}
				xSpeed = -xSpeed;

				b.style.scale = '0.5 1';
				setTimeout(() => {
					b.style.scale = '1 1';
				}, 150);
			}
			// Check for edges (bottom / top)
			if (y + b.clientHeight > window.innerHeight || y < 0) {
				ySpeed = -ySpeed;
				b.style.scale = '1 0.5';
				setTimeout(() => {
					b.style.scale = '1 1';
				}, 150);
			}

			//Set the new position of the logo
			b.style.left = x + 'px';
			b.style.top = y + 'px';
		}
	}

	// vercel build trigger line
</script>

<div class="flex flex-col px-4 relative min-h-[200vh]">
	{#if gaming}
		<div id="indicator">
			<div class="relative h-full p-4">
				<div
					class="absolute -rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[] min-w-max text-2xl font-mono"
				>
					Use your scrollbar
				</div>
			</div>
		</div>
	{/if}
	<div class="fixed bottom-4 right-0 flex items-baseline z-50">
		<span
			id="counter"
			class="font-bold text-lg pr-2 origin-bottom-right duration-300"
			style="text-shadow: 0 0 1rem #000;">x{pongs}</span
		>
		<img id="countegg" src="coots.webp" alt="Egg" class="h-24 w-24" />
	</div>

	<div
		id="bg1"
		class="cootsbg1 bg-[url('cootszoom.png')] rotate-45 bg-repeat outline outline-red-500 fixed -left-[105vw] top-0 h-[420vh] w-[420vw]"
	/>
	<div
		id="bg2"
		class="cootsbg2 bg-[url('cootszoom.png')] rotate-45 bg-repeat outline outline-red-500 fixed -left-[105vw] ml-20 top-0 h-[420vh] w-[420vw]"
	/>
	<div
		id="bg3"
		class="cootsbg3 hidden bg-[url('cootszoom.png')] rotate-45 bg-repeat outline outline-red-500 fixed -left-1/2 top-0 h-[420vh] w-[420vw]"
	/>
	<div
		id="bg4"
		class="cootsbg4 hidden bg-[url('cootszoom.png')] rotate-45 bg-repeat outline outline-red-500 fixed -left-1/2 ml-20 top-0 h-[420vh] w-[420vw]"
	/>

	<img
		id="pac"
		alt="PacMan"
		src="pacman.gif"
		style="opacity: 0; pointer-events: none;"
		class="rounded-full transform-gpu will-change-[top,left] fixed left-1/2 top-1/2 h-16 w-16 z-50"
	/>

	<button
		id="egg"
		class="transform-gpu will-change-[top,left] fixed h-24 w-24 z-50 rounded-full overflow-hidden"
		style="left: calc(50% - 3rem); top: calc(50% - 10rem); filter: drop-shadow(0 0 1rem #000);"
	>
		<img class="w-42 h-24" src="cootshead.webp" alt="Egg" />
	</button>
	<button
		id="start"
		class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 z-50 hover:scale-125 hover:rounded-4xl active:scale-100 active:rounded-md duration-150 rounded-2xl bg-blue-500 text-white font-black text-4xl"
		on:click|once={() => dvdbounce()}
	>
		Start
	</button>
	<div class="hidden sm:flex justify-center fixed left-1/2 -translate-x-1/2 h-full">
		<div class="line border-neutral-700 h-full" />
	</div>
	<h1
		class="flex fixed left-0 top-0 max-w-max py-12 items-center text-gradient bg-gradient-to-r from-blue-400 to-rose-400 font-bold text-3xl"
	>
		<span class="sm:px-4 sm:pl-[3.15rem]">CootsPong</span>
	</h1>
	<div class="fixed bottom-4 left-4 font-mono text-xs text-neutral-500">
		Made by <a class="text-white">PickleNik</a>, contributor to
		<a class="text-red-400">ReturnYouTubeDislike</a>,
		<a class="text-emerald-400">VueTube</a>
		and <a class="text-blue-400">RealZoo</a>
	</div>

	<!-- <div class="mx-auto text-center text-neutral-400 mb-4">Jan. 6</div> -->
	<div id="fininity" class="hidden md:flex justify-center relative">
		{#if pongs == 5}
			<div
				class="font-bold text-4xl text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
			>
				LVL2, Nice! 🚀
			</div>
		{/if}

		{#if pongs >= 10 && pongs < 20}
			<div
				class="font-bold text-4xl text-gradient bg-gradient-to-r from-pink-400 to-orange-400 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
			>
				🎉 WoW 🎉
			</div>
		{/if}

		{#if pongs >= 20 && pongs < 30}
			<div
				class="font-bold text-4xl text-gradient bg-gradient-to-r from-violet-400 to-blue-400 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
			>
				Insane 🐷
			</div>
		{/if}
		{#if pongs >= 30}
			<div
				class="font-bold text-4xl text-gradient bg-gradient-to-r from-orange-400 to-red-400 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
			>
				Stop. 🛑
			</div>
		{/if}
		<div
			class="fixed bg-gradient-to-b from-transparent via-red-400 to-transparent w-[1px] -ml-[0.5px] h-screen"
		/>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.black);
		color: theme(colors.neutral.50);
	}
	#indicator {
		border-right: 0.5rem dashed red;
		@apply fixed right-[0.15rem] top-0 h-full z-50 blink;
	}
	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.blink {
		animation: blink 1s 3 linear forwards;
	}
	/* 
	.changes {
		line-height: 2.25;
		@apply sm:w-96 w-52 pb-16 -mt-1;
	}
	.date {
		@apply text-neutral-500 sm:w-96 w-24;
	}
	.line {
		margin-left: -0.5px;
		@apply border-r;
	} */

	.cootsbg1 {
		z-index: -1;
		opacity: 0.2;
		transform: translateX(0) translateY(0) rotate(45deg);
		animation: sweep 1.5s ease-in-out infinite alternate;
	}
	.cootsbg2 {
		z-index: -1;
		opacity: 0.2;
		transform: translateX(3%) translateY(-5%) rotate(45deg);
		animation: sweep 1.5s ease-in-out infinite alternate-reverse;
	}

	.cootsbg3 {
		z-index: -1;
		opacity: 0;
		transform: translateX(0) translateY(0) rotate(45deg);
		animation: sweepop 1.5s ease-in-out infinite alternate;
	}
	.cootsbg4 {
		z-index: -1;
		opacity: 0;
		transform: translateX(3%) translateY(-5%) rotate(45deg);
		animation: sweepop 1.5s ease-in-out infinite alternate-reverse;
	}

	@keyframes sweep {
		0% {
			opacity: 0.5;
			transform: translateX(0) translateY(0) rotate(45deg);
		}
		50% {
			opacity: 0.75;
		}
		100% {
			opacity: 0.5;
			transform: translateX(0.3%) translateY(-0.5%) rotate(45deg);
		}
	}
	@keyframes sweepop {
		0% {
			opacity: 0;
			transform: translateX(0) translateY(0) rotate(45deg);
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0;
			transform: translateX(0.3%) translateY(-0.5%) rotate(45deg);
		}
	}
</style>
