<script lang="ts">

    import Repositories from "./components/Repositories/Repositories.svelte";
    import SearchBar from "./components/SearchBar/SearchBar.svelte";
    import type IRepository from "./interfaces/IRepository";

	let repos: IRepository[];

	function filter(event: CustomEvent<IRepository[]>) {
		repos = event.detail
	}
</script>

<main>
	<header><SearchBar on:Response={filter}/></header>
	<div><Repositories bind:repos/></div>
</main>

<style>

</style>