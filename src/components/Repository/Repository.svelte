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
        class="button function-button"
        class:remove-button={repo.onList} 
        on:click={() => dispatch('HandleList', repo)}>
        <img src="/assets/plus.svg" alt="plus icon rotate like a x" width="15">
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
    }
    a {
        color: rgb(0,100,200);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>