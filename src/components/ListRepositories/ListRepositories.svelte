<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    
    import Repository from "../Repository/Repository.svelte";

    export let list: IRepository[];
    export let title: string;

</script>

<div>

    <h2>{title}</h2>
   
    {#each list as item}
        <Repository
            repo={item}
            on:buttonClick
            />
    {/each}

</div>

<style>
    .box{
        border: 1px solid;
        display: inline-flex;
        flex-direction: column;
    }
</style>