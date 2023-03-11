import type IRepository from "../interfaces/IRepository";

function list(){
    let container = {};
    return {
        container,
        createList: function(name:string){
            container[name] = [];
            return {
                add: function(repo:IRepository){
                    container[name] = [{repo}]
                },
                remove: function(item){

                },
                clear: function(item){

                }
            }
        }
    }
}

export const listController = list()