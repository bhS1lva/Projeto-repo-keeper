<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";

    import { gitHubContent } from "../../controllers/listController";

    let username: string;
    let usernameError: string;
    let userInput: HTMLInputElement;
    let status: number; 

    function notFound(errorCode: number, user: string){
        status = errorCode;
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
                $gitHubContent = repos;
            } else {
                notFound(3, username)
            }            
        } else {
            notFound(searchRepo.status, username)
        }
    }
</script>

<div class="header">
    <img src="/assets/logo.svg" alt="logo">
    <form on:submit|preventDefault={onSubmit}>
        <div class="input-box">
            <input
                type="text"
                placeholder="Find a user"
                required
                bind:value={username}
                bind:this={userInput}
                class:input-error={status === 404 || status === 3}
            >
            <!-- {#if username} -->
            <div class="clear-box">
                <button
                    type="reset"
                    class="button clear-button"
                    title="Clear form"
                    on:click={() => userInput.focus()}
                >
                    <img src="/assets/bold-x.svg" alt="search icon">
                </button>
            </div>
        </div>
        <!-- {/if} -->
        <button type="submit" class="button submit-button" title="Search">
            <img src="/assets/search.svg" alt="search icon">
            <p>Search</p>
        </button>
    </form>
</div>

{#if status === 404 || status === 3}
    <div class="alert-box">
        {#if status === 404}
            <p>User {usernameError} not found!</p>
        {:else if status === 3}
            <p>{usernameError} has no repositories!</p>
        {/if}
    </div>
{/if}

<style>
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;
    }
    .header > img{
        width: 130px;
        margin-bottom: 30px;
    }
    form{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
    }
    .input-box{
        display: flex;
        align-items: center;
        position: relative;
        width: 70%;
        min-width: 200px;
    }
    input{
        font-family: 'Segoe UI', sans-serif;
        padding: 10px 20px;
		font-size: 1.3rem;
        font-weight: 100;
        border: 3px solid var(--gray);
		border-radius: 10px;
        outline: 0;
        width: 100%;
        transition: 0.5s;
    }
    .input-error{
        border: 1px solid red;
    }
    .alert-box{
        margin-top: 20px;
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
    }
    .submit-button img{
        width: 23px;
    }
    .clear-button{
        padding: 10px;
        border-radius: 20px;
        width: 25px;
        height: 25px;
        background-color: var(--gray);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .clear-box{
        position: absolute;
        right: 10px;
        padding: 10px;
        background-color: #fff;
    }
    .clear-button img{
        width: 11px;
    }
    @media(max-width: 460px){
        .submit-button p{
            display: none;
        }
    }
</style>