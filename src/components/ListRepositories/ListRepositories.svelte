<script lang="ts">    
    import { createEventDispatcher } from "svelte";

    import Repository from "../Repository/Repository.svelte";
    import type IRepository from "../../interfaces/IRepository";

    export let title: string = '';
    export let content: IRepository[] = [];

    let listName = '';

    const dispatch = createEventDispatcher<{
		CreateList: string,
        DeleteList: string
	}>();

</script>

<div class="box">

    <div class="title-box">
        
        <div class="title"><h2>{title}</h2></div>
        {#if title === ''}
            <div class="listName-form-box">
                <img src="/assets/trash.svg" alt="delete list icon">
                <form on:submit|preventDefault={() => dispatch('CreateList', listName)}>
                    <!-- svelte-ignore a11y-autofocus -->
                    <input autofocus={true} bind:value={listName}>
                </form>
            </div>
        {/if}
        <!-- {#if info.actions} -->
            <button class="list-button remove-button" on:click={() => dispatch('DeleteList', title)}>
                <img src="/assets/trash.svg" alt="delete list icon">
            </button>
            <button class="list-button clear-button" on:click={() => console.log(content)}> 
                <img src="/assets/clear.svg" alt="clear list icon"/>
            </button>
        <!-- {/if} -->
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
    }
    .title{
        overflow: hidden;
    }
    .box{
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 10px;
        width: 400px;
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
</style>