<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type IRepository from "../../interfaces/IRepository";

    let username: string = "";
    let status: number | null = null 

    const dispatch = createEventDispatcher<{
		Response: IRepository[] | null;
	}>();

    async function onSubmit() {
        const searchRepo = await fetch(`https://api.github.com/users/${username.trim()}/repos`);
        
        if(searchRepo.ok) {
            status = searchRepo.status;
            let repos = await searchRepo.json();

            repos = repos.map((data) => {
                return {
                    name: data.name,
                    url: data.html_url,
                    owner: data.owner.login,
                    id: data.id
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
    input, button {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
    }

    button {
        color: #333;
        background-color: #f4f4f4;
        outline: none;
    }
</style>