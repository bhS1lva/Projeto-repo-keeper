<script lang="ts">
    import { mappedLists, utils, addItem, showScope } from "../../controllers/listController";

    export let repo;

    let repoNotIn:string[] = [];

    $:repoNotIn = utils.getListReferences($mappedLists).filter(item => !repo.inList.includes(item));
</script>

<div class="box">
    <div class="lists">
        {#if repoNotIn.length}
            <button class="clickable" on:click={() => $showScope = true}>
                <p class="new-list">+create a new list</p>
            </button>
            <p>or</p>
            <h4>Add in a list:</h4>
        {:else}
            <h4>Create a new list to save the repository!</h4>
            <button class="clickable" on:click={() => $showScope = true}>
                <p class="new-list">+create a new list</p>
            </button>
        {/if}
        {#each repoNotIn as list}
            <button class="clickable" on:click={() => addItem(repo, list)}>
                <p>+{list}</p>
            </button>
        {/each }
    </div>
</div>

<style>
    .box{
        width: 250px;
        background-color: white;
        border: 2px solid var(--gray);
        text-align: center;
        font-size: 18px;
        padding: 10px;
        line-height: 25px;
        border-radius: 0px 40px 40px 40px;
        overflow: hidden;
    }
    .new-list{
        font-weight: bold;
        color: var(--green);
    }
    .clickable{
        font-size: 18px;
        background: none;
        font-weight: bold;
        border: none;
        color: var(--darker-gray);
        cursor: pointer;
    }
    .clickable:hover{
        color: var(--green);
        text-decoration: underline;
    }
    .lists{
        display: flex;
        flex-flow: column nowrap;
    }
    @media(max-width: 640px){
        .box{
            width: 150px;
            font-size: 15px;
        }
        .clickable{
            font-size: 15px;
        }
    }
</style>