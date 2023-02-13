<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";

    export let repos: IRepository[];
</script>

<div>
    {#if repos}
        <code>{repos[0].owner}</code>
        <code>Repositories:</code>
        {#each repos as repo}
            <code><a href={repo.url}>{repo.name}</a><span>({repos[0].owner})</span></code><br>
        {/each}
    {/if}
</div>

<style>

</style>