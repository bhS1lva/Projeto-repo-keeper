<script lang="ts">    
    import { createEventDispatcher } from "svelte";

    import Repository from "../Repository/Repository.svelte";
    import type IRepository from "../../interfaces/IRepository";

    export let title: string = '';
    export let content: IRepository[] = [];

    let newListName = '';

    const dispatch = createEventDispatcher<{
		CreateList: string,
        DeleteList: string,
        CloseNewListScope
	}>();
</script>

<div class="box">
    <div class="title-box">
        <div class="title"><h2>{title}</h2></div>
        {#if title === ''}
            <button class="list-button close-new-list-box" on:click={() => dispatch('DeleteList')} title="Close new list form">
                <img src="/assets/bold-x.svg" alt="close new list form">
            </button>
            <div class="listName-form-box">
                <img src="/assets/edit.svg" alt="name list icon">
                <form on:submit|preventDefault={() => dispatch('CreateList', newListName)}>
                    <!-- svelte-ignore a11y-autofocus -->
                    <input autofocus={true} bind:value={newListName}>
                    <button type="submit" class="list-button confirm-button" title="Confirm create new list">
                        <img src="/assets/check.svg" alt="create list icon">
                    </button>
                </form>
            </div>
        {/if}
        
        {#if title}
            <button class="list-button remove-button" on:click={() => dispatch('DeleteList', title)}>
                <img src="/assets/trash.svg" alt="delete list icon">
            </button>
            <button class="list-button clear-button" on:click={() => console.log(content)}> 
                <img src="/assets/clear.svg" alt="clear list icon"/>
            </button>
        {/if}
    </div>

    {#each content as item (item)}
        <Repository
            repo={item}
            list={title}
            on:AddItem
            on:RemoveItem
            on:CreateListModal
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
    }
    .title{
        overflow: hidden;
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
        bottom: 24px;
        width: 25px;
        height: 25px;	
    }
    .close-new-list-box img{
        width: 13px;
    }
</style>