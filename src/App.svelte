<script lang="ts">

    import Footer from "./components/Footer/Footer.svelte";
	import ManageLists from "./components/ManageLists/ManageLists.svelte";
    import SearchBar from "./components/SearchBar/SearchBar.svelte";

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