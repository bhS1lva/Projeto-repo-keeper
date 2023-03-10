<script lang="ts">
    export let lists: {in: string[], notIn: string[]};

</script>

<div class="box">
    <div>
        <p class="new-list clickable">
            +create a new list
        </p>
    </div>
    <p>or</p>
    <div>
        <h4>Add in an existing list:</h4>
        {#each lists.notIn as list}
            <p class="clickable">
                +{list}
            </p>
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
        border-radius: 5px;
    }
    .new-list{
        font-size: 23px;
    }
    .clickable{
        color: var(--darker-gray);
        cursor: pointer;
        overflow: hidden;
    }
    .clickable:hover{
        text-decoration: underline;
    }
</style>