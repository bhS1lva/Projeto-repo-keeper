<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    import Repository from "../Repository/Repository.svelte";

    export let lista: IRepository[];
    export let title: string;

</script>

<div>

    <h2>{title}</h2>
   
    {#each lista as item}
        <Repository
            repo={item}
            on:Response
            />
    {/each}

</div>

<style>
    
</style>