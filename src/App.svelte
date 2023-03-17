<script lang="ts">

    import Footer from "./components/Footer/Footer.svelte";
	import ManageLists from "./components/ManageLists/ManageLists.svelte";
    import SearchBar from "./components/SearchBar/SearchBar.svelte";
    import type IRepository from "./interfaces/IRepository";

	let repos: IRepository[];

	function getEvent(event: CustomEvent<IRepository[]>) {
		repos = event.detail
	}
</script>

<main>
	<header><SearchBar on:Response={getEvent}/></header>
	<div><ManageLists allRepositories={repos}/></div>
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