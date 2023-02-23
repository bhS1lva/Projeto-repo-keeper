<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type IRepository from "../../interfaces/IRepository";

    export let repo: IRepository;

    const dispatch = createEventDispatcher<{
		Click: IRepository
	}>();

</script>

<div class="box">
    <p>
        <a href={repo.url}>{repo.name}</a>
        <span>({repo.owner})</span>
    </p>
    <button 
        class="button"
        class:remove-button={repo.onList} 
        on:click={() => dispatch('Click', repo)}>
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