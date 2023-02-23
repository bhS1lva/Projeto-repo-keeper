<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    import Repository from "../Repository/Repository.svelte";

    export let lista: IRepository[];
    export let title: string;

</script>

<div class="box">

    <h2>{title}</h2>
   
    {#each lista as item}
        <Repository
            repo={item}
            on:Click
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