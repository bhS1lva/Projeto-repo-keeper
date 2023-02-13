<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type IRepository from "../../interfaces/IRepository";

    let username: string = "";
    let status: number | null = null 

    const dispatch = createEventDispatcher<{
		Response: IRepository[] | null;
	}>();

    async function onSubmit() {
        const searchRepo = await fetch(`https://api.github.com/users/${username}/repos`);
        
        if(searchRepo.ok) {
            status = searchRepo.status;
            let repos = await searchRepo.json();

            repos = repos.map((data) => {
                return {
                    name: data.name,
                    url: data.html_url,
                    owner: data.owner.login
                } as IRepository
            });

            dispatch('Response', repos);
        } else {
            status = searchRepo.status;
            dispatch('Response', null);
        }
    }

</script>

<form on:submit|preventDefault={onSubmit}>
    <input
        type="text"
        placeholder="Pesquise o usuário"
        required
        bind:value={username}
    >
    <button type="submit">Pesquisar</button>
</form>
{#if status === 404}
    <code>Usuário não encontrado!</code>
{/if}
<style>

</style>