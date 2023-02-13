<script lang="ts">
    import type IRepository from "../../interfaces/IRepository";
    import SavedRepositories from "./SavedRepositories/SavedRepositories.svelte";

    export let repositories: IRepository[] | null = null;

    let repoList: IRepository[] = [];

    function addToList(repo: IRepository){
        const index = repoList.findIndex(item => (item.id === repo.id));

        if(index === -1){
            repoList = [...repoList, repo];
        } else {
            repoList.splice(index, 1);
            //this reassignment was made to trigger the reactivity of svelte
            repoList = repoList;
        }
    }

</script>

<div>
    {#if repositories}
        <h2>{repositories[0].owner} repositories:</h2>
        {#each repositories as repo}
            <div class="repo">    
                <p>
                    <a href={repo.url}>{repo.name}</a>
                    <span>({repo.owner})</span>
                </p>
                <button class="add-button" on:click={() => addToList(repo)}>+</button>
            </div>
        {/each}
    {/if}
    {#if repoList.length}
        <SavedRepositories list={repoList}/>
    {/if}
</div>

<style>
    *{
        font-family: Consolas, "courier new";
        padding-left: 10px;
    }
    .repo{
        display: flex;
        align-items: center;
        padding-left: 30px;
        font-size: 20px;
    }
    .add-button{
        padding: 4px 8px;
        border-radius: 10px;
        margin-left: 5px;
        border: 1px solid #ccc;
    }
    a {
        color: rgb(0,100,200);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    a:visited {
        color: rgb(0,80,160);
    }
</style>