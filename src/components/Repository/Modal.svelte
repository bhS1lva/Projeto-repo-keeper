<script lang="ts">

    export let lists: {in: string[], notIn: string[]};

    // let listName = '';

</script>

<div class="box">
    <!-- <div>
        <button class="clickable" on:click={() => console.log('modal component')}>
            <p class="new-list">+create a new list</p>
        </button>
    </div> 
    <p>or</p>-->
    <div>
        <h4>Add in an existing list:</h4>
        {#each lists.notIn as list}
            <button class="clickable">
                <p>+{list}</p>
            </button>
        {/each }
    </div>
</div>

<style>
    .box{
        width: 300px;
        background-color: white;
        border: 2px solid var(--gray);
        text-align: center;
        font-size: 18px;
        padding: 10px;
        line-height: 25px;
        border-radius: 0px 40px 40px 40px;
        overflow: hidden;
    }
    /* .new-list{
        font-size: 23px;
    } */
    .clickable{
        font-size: 18px;
        background: none;
        border: none;
        color: var(--darker-gray);
        cursor: pointer;
    }
    .clickable:hover{
        text-decoration: underline;
    }
</style>