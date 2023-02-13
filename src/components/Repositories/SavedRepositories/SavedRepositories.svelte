<script lang="ts">
    import type IRepository from "../../../interfaces/IRepository";
    
    export let list: IRepository[] = [];

</script>

<div>
    <h2>Added repositories</h2>
    {#each list as repo}
        <p><a href={repo.url}>{repo.name}</a><span>({repo.owner})</span></p>
    {/each}
</div>

<style>

</style>