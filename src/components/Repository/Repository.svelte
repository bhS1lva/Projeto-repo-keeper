<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import type IRepository from "../../interfaces/IRepository";

    export let repo: IRepository;

    const dispatch = createEventDispatcher<{
		HandleList: IRepository
	}>();

</script>

<div class="repository">
    <div class="info">
        <a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a>
        <p>({repo.owner})</p>
    </div>
    <button
        class="function-button add-button"
        class:remove-button={repo.onList}
        on:click={() => dispatch('HandleList', repo)}>
        
        <img src="/assets/plus.svg" alt="add item on list icon">
    </button>
</div>

<style>
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