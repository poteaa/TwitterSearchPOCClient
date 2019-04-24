export class Tweet {

  constructor(
    public id: string,
    public username: string,
    public nickname: string,
    public userImage: string,
    public creationDate: string,
    public text: string,
    public favorite: boolean) {
  }
}
