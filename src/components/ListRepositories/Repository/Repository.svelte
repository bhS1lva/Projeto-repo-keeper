<script lang="ts">
    import type IRepository from "../../../interfaces/IRepository";

    export let repo: IRepository;
    
</script>

<div>
    <p><a href={repo.url}>{repo.name}</a><span>({repo.owner})</span></p>
</div>

<style>
    a {
        color: rgb(0,100,200);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>