<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";

    import { createEventDispatcher } from "svelte";

    let username = "";
    let userInput: HTMLInputElement;
    let status: number; 

    const dispatch = createEventDispatcher<{
		Response: IRepository[] | null;
	}>();

    function notFound(errorCode: number){
        status = errorCode;
        return dispatch('Response', null);
    }

    async function onSubmit() {
        userInput.focus()
        
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
                notFound(3)
            }            
        } else {
            notFound(searchRepo.status)
        }
    }

</script>

<form on:submit|preventDefault={onSubmit}>
    <input
        type="text"
        placeholder="Find a user"
        required
        bind:value={username}
        bind:this={userInput}
        class:input-error={status === 404 || status === 3}
    >
    <button class="button submit-button">
        <img src="/assets/search.svg" width="23" alt="search icon">
        Search
    </button>
</form>
<div class="alert-box">
    {#if status === 404}
        <p>User not found!</p>
    {:else if status === 3}
        <p>This user has no repositories!</p>
    {/if}
</div>

<style>
    form{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    input{
        font-family: 'Segoe UI', sans-serif;
        padding: 10px 20px;
		width: 50%;
		font-size: 1.3rem;
        font-weight: 100;
        border: 2px solid var(--gray);
		border-radius: 10px;
        outline: 0;
    }
    .input-error{
        border: 1px solid red;
    }
    .alert-box{
        display: inline-flex;
        font-size: 1.5rem;
        font-style: italic;
    }    
    .submit-button{
        padding: 10px;
        font-size: 22px;
        gap: 8px;
        border-radius: 25px;
    }
</style>