class ListController{
    container:{};
    createList(name:string){
        this.container[name] = [];    
    };
    deleteList(name:string){
        delete this.container[name];
    }
    constructor(container:{}){
        this.container = container;
    }
}

export const listController = new ListController({});