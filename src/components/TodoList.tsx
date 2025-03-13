import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types";
import { format } from "date-fns";

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: (prev: Todo[]) => Todo[]) => void;
  sortType: string;
  stateFilter: string;
  groupBy: string;
}

export default function TodoList({
  todos,
  setTodos,
  sortType,
  stateFilter,
  groupBy,
}: TodoListProps) {
  const toggleState = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              state: todo.state === "pending" ? "completed" : "pending",
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortType === "state") return a.state.localeCompare(b.state);
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const filteredTodos =
    stateFilter === "all"
      ? sortedTodos
      : sortedTodos.filter((todo) => todo.state === stateFilter);

  const groupedTodos =
    groupBy === "none"
      ? { None: filteredTodos }
      : groupBy === "state"
      ? filteredTodos.reduce((acc, todo) => {
          (acc[todo.state] = acc[todo.state] || []).push(todo);
          return acc;
        }, {} as Record<string, Todo[]>)
      : filteredTodos.reduce((acc, todo) => {
          const date = format(new Date(todo.date), "yyyy-MM-dd");
          (acc[date] = acc[date] || []).push(todo);
          return acc;
        }, {} as Record<string, Todo[]>);

  return (
    <div className="pb-10">
      {Object.entries(groupedTodos).map(([key, items]) => (
        <div key={key} className="space-y-4">
          {groupBy !== "none" && (
            <h2 className="text-lg font-semibold">{key}</h2>
          )}
          {items.map((todo) => (
            <Card key={todo.id} className="p-2 flex justify-between">
              <div className="flex items-center justify-between space-x-2">
                <span
                  className={todo.state === "completed" ? "line-through" : ""}
                >
                  {todo.text}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(todo.date), "yyyy-MM-dd")}
                </span>
              </div>
              <div className="space-x-2">
                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant="outline"
                  onClick={() => toggleState(todo.id)}
                >
                  {todo.state === "pending" ? "✔" : "↩"}
                </Button>
                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
