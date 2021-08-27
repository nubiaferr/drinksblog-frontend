import { Theme } from './Theme';
import {User} from './User';

export class Post{
  public id: number
  public title: string
  public text: string
  public date: Date
  public user: User
  public theme: Theme
}
