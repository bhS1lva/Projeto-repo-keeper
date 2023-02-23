<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type IRepository from "../../interfaces/IRepository";

    let username: string = "";
    let status: number; 

    const dispatch = createEventDispatcher<{
		Response: IRepository[] | null;
	}>();

    function noRepoFound(errorCode: number){
        status = errorCode;
        return dispatch('Response', null);
    }

    async function onSubmit() {
        const searchRepo = await fetch(`https://api.github.com/users/${username.trim()}/repos`);
        if(searchRepo.ok) {
            let repos = await searchRepo.json();
            status = searchRepo.status

            if(repos.length){
                repos = repos.map((data) => {
                    return {
                        name: data.name,
                        url: data.html_url,
                        owner: data.owner.login,
                        id: data.id,
                        onList: false
                    } as IRepository
                });
                dispatch('Response', repos);
            } else {
                noRepoFound(3)
            }            
        } else {
            noRepoFound(searchRepo.status)
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
    <p>User not found!</p>
{:else if status === 3}
    <p>this user has no repositories</p>
{/if}

<style>
    form{
        border: 1px solid red;

    }
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