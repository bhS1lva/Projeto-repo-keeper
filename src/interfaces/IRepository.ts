export default interface IRepository {
    id: number,
    name: string,
    url: string,
    owner: string,
    inList: string[],
    clicked: boolean | 'blocked'
}