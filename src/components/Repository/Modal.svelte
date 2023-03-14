<script lang="ts">
    export let lists: {in: string, notIn: string[]};
    // export let listName: string;

    export let repo;

    import { createEventDispatcher } from "svelte";

    import type IRepository from "../../interfaces/IRepository";

    const dispatch = createEventDispatcher<{
        AddItem: {repo: IRepository, list: string}
    }>();
</script>

<div class="box">
    <!-- <div>
        <button class="clickable" on:click={() => console.log('modal component')}>
            <p class="new-list">+create a new list</p>
        </button>
    </div> 
    <p>or</p>-->
    <div class="lists">
        {#if lists.notIn.length}
            <h4>Add in a list:</h4>
            {:else}
            <h4>Create a new list to save the repository!</h4>
        {/if}
        {#each lists.notIn as list}
            <button class="clickable" on:click={() => dispatch('AddItem', {repo, list})}>
                <p>+{list}</p>
            </button>
        {/each }
    </div>
</div>

<style>
    .box{
        width: 250px;
        background-color: white;
        border: 2px solid var(--gray);
        text-align: center;
        font-size: 18px;
        padding: 10px;
        line-height: 25px;
        border-radius: 0px 40px 40px 40px;
        overflow: hidden;
    }
    /* .new-list{
        font-size: 23px;
    } */
    .clickable{
        font-size: 18px;
        background: none;
        border: none;
        color: var(--darker-gray);
        cursor: pointer;
    }
    .clickable:hover{
        text-decoration: underline;
    }
    .lists{
        display: flex;
        flex-flow: column nowrap;
    }
</style>