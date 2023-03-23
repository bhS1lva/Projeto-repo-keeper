<script lang="ts">
    import ListRepositories from "./ListRepositories.svelte";

    import { utils, mappedLists, gitHubContent, showScope, createNewList } from "../../controllers/listController";
    import { localStorageController } from "../../controllers/localStorageController";

    if(localStorage.length) localStorageController.render()
</script>

<div class="new-list-box">
    <button on:click={() => $showScope = true} title="Create a new list">
        <h2>+create a new list</h2>
    </button>
</div>
<div class="list-box">
    {#if $gitHubContent.length}
        <ListRepositories
            listName={`${$gitHubContent[0].owner} repositories`}
            content={$gitHubContent}
            isGitHubContent={true}
        />
    {/if}
    {#each utils.getListReferences($mappedLists) as list}
        <ListRepositories
            listName={list}
            content={$mappedLists[list]}
        /> 
    {/each}
    {#if $showScope}
        <ListRepositories/>
    {/if}
    {#if !utils.getListReferences($mappedLists).length && !$gitHubContent.length && !$showScope}
        <img class="no-list-image" src="/assets/noListsImage.png" alt="you don’t have any list">
    {/if}
</div>

<style>
    .list-box{
        display: flex;
        gap: 70px;
        justify-content: space-evenly;
        flex-flow: row wrap;
    }
    .new-list-box{
        text-align: center;
        padding: 30px;
    }
    .new-list-box button{
        font-size: 18px;
        background: none;
        border: none;
        color: var(--darker-gray);
        cursor: pointer;
    }
    .new-list-box button:hover{
        text-decoration: underline;
    }
    .no-list-image{
        margin: 10px 20px 40px 20px;
    }
    @media(max-width: 390px){
        .no-list-image{
            width: 100%;
        }
    }
</style>