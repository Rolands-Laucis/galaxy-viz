<script>
	import {fade} from 'svelte/transition'

	let loaded = false, help = true

	function p5Loaded (){
		console.log("Loaded p5, can do stuff wooo...")
		loaded = true
	}

	function on_key_down(event){
		if (event.repeat) return;

		switch (event.key) {
            case "h":
                help = !help
                event.preventDefault();
                break;
        }
	}
</script>

<svelte:head>
	<script src="./p5.min.js" on:load={p5Loaded}></script>
	{#if loaded}
		<script src="./LogOnce.js"></script>
		<script src="./utils.js"></script>
		<script src="./FlowField.js"></script>
		<script src="./FadeLinePoint.js"></script>
		<script src="./fade_lines.js"></script>
	{/if}
</svelte:head>

<svelte:window
    on:keydown={on_key_down}
/>

<main on:click={() => window.new_viz()} on:dblclick={() => window.play_viz()}>
	{#if help}
		<section transition:fade={{duration:130}} on:click={() => help = !help}>
			<h1>This is a visualization renderer for the song "Rolands Laucis - Projects (can't do it all)"</h1>
			<h2>Controls:</h2>
			<ul>
				<li><b>H / TAP (mobile)</b> - toggle this help box</li>
				<li><b>RIGHT ARROW / TAP (mobile)</b> - new random render</li>
				<li><b>UP ARROW / DOUBLE TAP (mobile)</b> - toggle animation of render (should be butter smooth 60fps)</li>
				<li><b>DOWN ARROW</b> - print to console the current random config</li>
				<li><b>F11</b> - to enter fullscreen mode (or whatever it is on your browser)</li>
			</ul>
			<h3>You are free to use this for whatever you like, so long as you credit me - <a href="https://www.rolandslaucis.lv/" target="_blank">Rolands Laucis</a></h3>
			<h3><a href="https://github.com/Rolands-Laucis/galaxy-viz" target="_blank">GITHUB</a></h3>
		</section>
	{/if}
</main>

<style>
	main{
		height: 100%;
		width: 100%;
	}

	section{
		position: absolute;
		bottom: 24px;
		left: 24px;
		margin-right: 24px;
		padding: 24px;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 12px;

		border: 1px solid white;
		border-radius: 16px;
		background: linear-gradient(45deg, rgb(22, 22, 22) 30%, rgb(37, 37, 43) 100%);
		color: #fff;

		-webkit-box-shadow: 0px 4px 23px -3px rgba(0,0,0,0.46); 
		box-shadow: 0px 4px 23px -3px rgba(0,0,0,0.46);
	}

	h1{
		font-size: 24px;
		font-weight: bold;
	}
	h2{
		font-size: 18px;
		font-weight: normal;
	}
	li{
		font-size: 14px;
		margin-left: 24px;
	}
	h3{
		font-size: 12px;
		font-weight: normal;
	}
	a{color: #fff;}
</style>