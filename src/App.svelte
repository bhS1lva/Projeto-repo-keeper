<script lang="ts">

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

<style>

</style>