<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";

    import { createEventDispatcher } from "svelte";

    let username: string;
    let usernameError: string;
    let userInput: HTMLInputElement;
    let status: number; 

    const dispatch = createEventDispatcher<{
		Response: IRepository[] | null;
	}>();

    function notFound(errorCode: number, user: string){
        status = errorCode;
        dispatch('Response', null)
        return usernameError = user;
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
                        onList: [],
                        clicked: false
                    } as IRepository
                });
                dispatch('Response', repos);
            } else {
                notFound(3, username)
            }            
        } else {
            notFound(searchRepo.status, username)
        }
    }
</script>

<div class="form-box">
    <form on:submit|preventDefault={onSubmit}>
        <input
            type="text"
            placeholder="Find a user"
            required
            bind:value={username}
            bind:this={userInput}
            class:input-error={status === 404 || status === 3}
        >
        <button
            type="reset"
            class="button clear-button"
            title="Clear form"
            class:disappear={!username}
            on:click={() => userInput.focus()}
        >
            <img src="/assets/bold-x.svg" alt="search icon">
        </button>
        <button type="submit" class="button submit-button" title="Search">
            <img src="/assets/search.svg" alt="search icon">
            Search
        </button>
    </form>

</div>
<div class="alert-box">
    {#if status === 404}
        <p>User {usernameError} not found!</p>
    {:else if status === 3}
        <p>{usernameError} has no repositories!</p>
    {/if}
</div>

<style>
    .form-box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row nowrap;
        margin-bottom: 10px;
    }
    form{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
    }
    input{
        font-family: 'Segoe UI', sans-serif;
        padding: 10px 20px;
		font-size: 1.3rem;
        font-weight: 100;
        border: 3px solid var(--gray);
		border-radius: 10px;
        outline: 0;
        width: inherit;
        min-width: 250px;
        transition: 0.5s;
    }
    .input-error{
        border: 1px solid red;
    }
    .alert-box{
        display: inline-flex;
        font-size: 1.5rem;
        font-style: italic;
    }   
    .button{
        cursor: pointer;
        border: none;        
    } 
    .submit-button{
        padding: 10px;
        font-size: 22px;
        gap: 8px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        font-weight: bold;
        position: relative;
        right: 15px;
    }
    .submit-button img{
        width: 23px;
    }
    .clear-button{
        position: relative;
        right: 40px;
        padding: 10px;
        border-radius: 20px;
        width: 25px;
        height: 25px;
        background-color: var(--gray);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .clear-button img{
        width: 11px;
    }
    .disappear{
        visibility: hidden;
    }
</style>