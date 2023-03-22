import { jsonProperty, Serializable } from "ts-serializable";
import "reflect-metadata";
import { TodoDTO } from "../todoDTO/todoDTO";

export class NoteDTO extends Serializable {
  @jsonProperty(String)
  _id = "";

  @jsonProperty(String)
  title = "";

  @jsonProperty([TodoDTO])
  todos: TodoDTO[] = [];
}
