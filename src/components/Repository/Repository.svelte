<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";

    import Modal from "./Modal.svelte";
    import { createEventDispatcher } from "svelte";

    export let repo: IRepository;
    export let list: string;

    const isRepoBlocked = typeof(repo.clicked) === 'boolean';

    const dispatch = createEventDispatcher<{
        RemoveItem: {repo:IRepository, list:string}
    }>();
</script>

<div class="repository">
    <div class="info">
        <a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a>
        <p>({repo.owner})</p>
    </div>
    <div class="side-box">
        {#if isRepoBlocked}
            <button
                class="function-button add-button"
                class:remove-button={repo.clicked}
                on:click={() => repo.clicked = !repo.clicked}
                title="Show repository options"
            >
                <img src="/assets/plus.svg" alt="add item on list icon">
            </button>
            {:else}
                <button 
                    class="function-button remove-button" 
                    on:click={() => dispatch('RemoveItem', {repo, list})}
                >
                    <img src="/assets/plus.svg" alt="remove item from list icon">
                </button>
        {/if}
        {#if repo.clicked && isRepoBlocked}
            <div class="modal">
                <Modal 
                    {repo}
                    on:AddItem
                    on:CreateListModal
                />
            </div>
        {/if}
    </div>
</div>


<style>
    .modal{
        position: absolute;
        left: 33px;
        z-index: 1;
    }
    .side-box{
        position: relative;
        align-items: baseline;
        display: flex;
    }
    .repository{
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 10px;
        margin: 13px 0px 5px 0px;
    }
    .info{
        display: inline-flex;
        gap: 5px;
        font-size: 18px;
    }
    a{
        color: rgb(0,100,200);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    .function-button{
        width: 25px;
        height: 25px;	
        cursor: pointer;
        border: none;
        display: flex;
        align-items: center;
        font-weight: bold;
        padding: 5px;
        border-radius: 20px;
    }
    .function-button img{
        width: 15px;
    }
    .add-button{
        background-color: var(--gray);
    }
    .remove-button{
	    background-color: pink;
        transform: rotate(0.13turn);
    }
</style>