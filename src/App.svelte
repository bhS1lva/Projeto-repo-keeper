<script lang="ts">
    import SearchBar from "./components/SearchBar/SearchBar.svelte";
	import ManageLists from "./components/List/ManageLists.svelte";
	import Footer from "./components/Footer/Footer.svelte";
</script>

<main>
	<header><SearchBar/></header>
	<div><ManageLists/></div>
	<footer><Footer/></footer>
</main>

<style>
	main{
		padding: 40px;
	}
	div{
		margin-bottom: 70px;
	}
	footer{
		position: fixed; 
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
	}
</style>