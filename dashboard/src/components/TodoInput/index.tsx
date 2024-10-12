import { TodoForm } from './TodoForm'
import * as actions from "@/actions"

export default function TodoInput() {
  return <TodoForm createTodo={actions.createTodo} />
}