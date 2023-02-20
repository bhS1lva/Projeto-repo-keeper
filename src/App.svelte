<script lang="ts">

    import ManageRepositories from "./components/ManageRepositories/ManageRepositories.svelte";
    import SearchBar from "./components/SearchBar/SearchBar.svelte";
    import type IRepository from "./interfaces/IRepository";

	let repos: IRepository[];

	function getEvent(event: CustomEvent<IRepository[]>) {
		repos = event.detail
	}
</script>

<main>
	<header><SearchBar on:Response={getEvent}/></header>
	<div><ManageRepositories allRepositories={repos}/></div>
</main>

<style>

</style>