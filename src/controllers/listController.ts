export class ListController{
    container;
    createList(name:string){
        this.container[name] = [];
    };
    deleteList(name:string){
        delete this.container[name];
    }
    constructor(container){
        this.container = container;
    }
}

function list(){
    let container = {};
    return {
        container,
        createList: function(name:string){
            container[name] = [];
        }
    }
}


// export const listController = list()
