<script lang="ts">

    import Repositories from "./components/ListRepositories/ListRepositories.svelte";
    import SearchBar from "./components/SearchBar/SearchBar.svelte";
    import type IRepository from "./interfaces/IRepository";

	let repos: IRepository[];

	function getEvent(event: CustomEvent<IRepository[]>) {
		repos = event.detail
	}
</script>

<main>
	<header><SearchBar on:Response={getEvent}/></header>
	<div><Repositories repositories={repos}/></div>
</main>

<style>

</style>