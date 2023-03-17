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

</main>
<footer><Footer/></footer>

<style>
	main{
		padding: 30px;
		position: relative;
	}
	footer{
		height: 255px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
</style>