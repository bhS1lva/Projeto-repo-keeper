<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    
    import Repository from "../Repository/Repository.svelte";

    export let list: IRepository[];
    export let title: string;

</script>

<div class="box">

    <div class="title-box">
        <h2>{title}</h2>
        <button class="button function-button remove-button">
            <img src="/assets/plus.svg" alt="plus icon rotate like a x" width="15">
        </button>
    </div>

    {#each list as item (item)}
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
    }
</style>