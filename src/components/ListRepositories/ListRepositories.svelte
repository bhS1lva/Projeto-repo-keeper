<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    
    import Repository from "../Repository/Repository.svelte";

    import { createEventDispatcher } from "svelte";

    export let info: {title: string, list: IRepository[], actions: boolean};

    const dispatch = createEventDispatcher<{
        ClearList: IRepository[],
        DeleteList: IRepository[]
    }>();
</script>

<div class="box">

    <div class="title-box">
        <h2>{info.title}</h2>
        {#if info.actions}
            <button class="list-button remove-button" on:click={() => dispatch('DeleteList', info.list)}>
                <img src="/assets/trash.svg" alt="delete list icon">
            </button>
            <button class="list-button clear-button" on:click={() => dispatch('ClearList', info.list)}>
                <img src="/assets/clear.svg" alt="clear list icon"/>
            </button>
        {/if}
    </div>

    {#each info.list as item (item)}
        <Repository
            repo={item}
            on:HandleList
            />
    {/each}

</div>

<style>
    .title-box{
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }
    .box{
        display: flex;
        flex-direction: column;
        border: 1px solid red;
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