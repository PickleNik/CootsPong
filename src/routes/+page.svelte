<script>
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';

	let gaming = false;
	let uid = '';
	let pongs = 0;
	let interval;
	let b;
	let fin;
	onDestroy(() => {
		clearInterval(interval);
	});
	onMount(async () => {
		fin = document.querySelector('#fininity');
		b = document.querySelector('#egg');
		const { width: bWidth, height: bHeight } = b.getBoundingClientRect(),
			i = Math.floor(Math.random() * (window.innerWidth - bWidth)) + 1,
			j = Math.floor(Math.random() * (window.innerHeight - bHeight)) + 1;

		b.style.left = i + 'px';
		b.style.top = j + 'px';
	});
	function dvdbounce() {
		gaming = true;
		b.classList.remove('duration-150');
		b.classList.remove('hover:scale-125');

		//Initial position
		var x = b?.getBoundingClientRect().left;
		var y = b?.getBoundingClientRect().top;

		//Speed and direction
		var xSpeed = window.innerWidth > 1000 ? 5 : 2;
		var ySpeed = window.innerWidth > 1000 ? 5 : 2;
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
						xSpeed = window.innerWidth > 1000 ? 5 : 2;
						ySpeed = window.innerWidth > 1000 ? 5 : 2;
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
						xSpeed += 0.5;
						ySpeed *= 2;
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
		class="cootsbg1 bg-[url('cootszoom.png')] opacity-50 rotate-45 bg-repeat outline outline-red-500 fixed -left-1/2 top-0 h-[420vh] w-[420vw]"
	/>
	<div
		class="cootsbg2 bg-[url('cootszoom.png')] opacity-50 rotate-45 bg-repeat outline outline-red-500 fixed -left-1/2 ml-20 top-0 h-[420vh] w-[420vw]"
	/>

	<button
		id="egg"
		class="transform-gpu will-change-[top,left] fixed left-1/2 -top-1/2 h-24 w-24 z-50 hover:scale-125 duration-150 rounded-full overflow-hidden"
		on:click|once={() => dvdbounce()}
	>
		<img class="w-42 h-24" src="cootshead.webp" alt="Egg" />
	</button>
	<div class="hidden sm:flex justify-center fixed left-1/2 -translate-x-1/2 h-full">
		<div class="line border-neutral-700 h-full" />
	</div>
	<h1
		class="flex fixed left-0 top-0 max-w-max py-12 px-4 items-center text-gradient bg-gradient-to-r from-blue-400 to-rose-400 font-bold text-3xl"
	>
		<span class="sm:px-4 sm:pl-[2.15rem]">CootsPong</span>
	</h1>

	<!-- <div class="mx-auto text-center text-neutral-400 mb-4">Jan. 6</div> -->
	<div id="fininity" class="hidden md:flex justify-center relative">
		{#if pongs >= 5 && pongs < 10}
			<div
				class="font-bold text-xl text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-max"
			>
				Nice! 🚀
			</div>
		{/if}

		{#if pongs >= 10 && pongs < 20}
			<div
				class="font-bold text-xl text-gradient bg-gradient-to-r from-pink-400 to-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-max"
			>
				🎉 WoW 🎉
			</div>
		{/if}

		{#if pongs >= 20 && pongs < 30}
			<div
				class="font-bold text-xl text-gradient bg-gradient-to-r from-violet-400 to-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-max"
			>
				Insane 🐷
			</div>
		{/if}
		{#if pongs >= 30}
			<div
				class="font-bold text-xl text-gradient bg-gradient-to-r from-orange-400 to-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-max"
			>
				Stop. 🛑
			</div>
		{/if}
		<div
			class="bg-gradient-to-b from-transparent via-red-400 to-transparent w-[1px] -ml-[0.5px] h-screen"
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
		animation: sweep1 5s linear 1;
	}
	.cootsbg2 {
		animation: sweep2 5s linear 1;
	}

	@keyframes sweep1 {
		from {
			transform: translateX(0) translateY(0) rotate(45deg);
		}
		to {
			transform: translateX(30%) translateY(-50%) rotate(45deg);
		}
	}
	@keyframes sweep2 {
		from {
			transform: translateX(0) translateY(0) rotate(45deg);
		}
		to {
			transform: translateX(-30%) translateY(50%) rotate(45deg);
		}
	}
</style>
