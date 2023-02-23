<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import type IRepository from "../../interfaces/IRepository";

    export let repo: IRepository;

    const dispatch = createEventDispatcher<{
		buttonClick: IRepository
	}>();

</script>

<div>
    <p>
        <a href={repo.url} target="_blank" rel="noreferrer">{repo.name}</a>
        <span>({repo.owner})</span>
    </p>
    <button
        class:remove-button={repo.onList} 
        on:click={() => dispatch('buttonClick', repo)}>
        +
    </button>
</div>

<style>
    .box{
        display: inline-flex;
        align-items: center;
    }
    a {
        color: rgb(0,100,200);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    .button{
        padding: 4px 8px;
        border-radius: 20px;
        margin-left: 5px;
        border: 1px solid #ccc;
        transition: 0.3s;
        cursor: pointer;
    }
    .remove-button{
        background-color: pink;
        transform: rotate(0.13turn);
    }
</style>