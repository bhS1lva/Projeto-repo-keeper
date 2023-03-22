<script lang="ts">    
   
    import Repository from "../Repository/Repository.svelte";
    import type IRepository from "../../interfaces/IRepository";
    import { createNewList, deleteList, showScope, gitHubContent } from "../../controllers/listController";

    export let title: string = '';
    export let content: IRepository[] = [];
    export let isGitHubContent: boolean = false;

    let newListName = '';

</script>


<div class="box">
    <button on:click={() => console.log(title, content)}> mostra conteudo</button>
    <div class="title-box">
        <h2>{title}</h2>
        {#if title}
            {#if !isGitHubContent}
                <button class="list-button remove-button" on:click={() => deleteList(title)} title="Delete list button">
                    <img src="/assets/trash.svg" alt="delete list icon">
                </button>
                <button class="list-button clear-button" on:click={() => content = []} title="Clear list button"> 
                    <img src="/assets/clear.svg" alt="clear list icon"/>
                </button>
            {:else}
                <button class="list-button remove-button" on:click={() => $gitHubContent = []} title="Delete list button">
                    <img src="/assets/trash.svg" alt="delete list icon">
                </button>
            {/if}
        {:else}
            <button
                class="list-button close-new-list-box"
                on:click={() => $showScope = false}
                title="Close new list form"
            >
                <img src="/assets/bold-x.svg" alt="close new list form">
            </button>
            <div class="listName-form-box">
                <img src="/assets/edit.svg" alt="name list icon">
                <form on:submit|preventDefault={() => createNewList(newListName)}>
                    <!-- svelte-ignore a11y-autofocus -->
                    <input autofocus={true} bind:value={newListName}>
                    <button type="submit" class="list-button confirm-button" title="Confirm create new list">
                        <img src="/assets/check.svg" alt="create list icon">
                    </button>
                </form>
            </div>
        {/if}
    </div>

    {#each content as item (item)}
        <Repository
            repo={item}
        />
    {/each}
</div>

<style>
    .title-box{
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        position: relative;
        word-break: break-word;
    }
    .box{
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        padding: 10px;
        border-radius: 10px;
    }
    .listName-form-box{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .listName-form-box input{
        height: 30px;
        width: 230px;
    }
    .listName-form-box img{
        width: 30px;
    }
    .listName-form-box form{
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .list-button{
        width: 30px;
        height: 30px;	
        cursor: pointer;
        border: none;
        display: flex;
        align-items: center;
        font-weight: bold;
        padding: 5px;
        border-radius: 10px;
    }
    .list-button img{
        width: 20px;
    }	
    .remove-button{
	    background-color: pink;
    }
    .clear-button{
        background-color: var(--yellow);
    }
    .confirm-button{
        background-color: var(--green);
    }
    .close-new-list-box{
        border-radius: 20px;
        background-color: var(--gray);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: -20px;
        bottom: 27px;
        width: 25px;
        height: 25px;	
    }
    .close-new-list-box img{
        width: 13px;
    }
    @media(max-width: 435px){
        .listName-form-box > img{
            display: none;
        }
    }   
    @media(max-width: 370px){
        .listName-form-box input{
            width: 100%;
        }
    }
</style>