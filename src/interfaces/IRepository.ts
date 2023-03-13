export default interface IRepository {
    id: number,
    name: string,
    url: string,
    owner: string,
    onList: string[],
    clicked: boolean | 'blocked'
}