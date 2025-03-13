"use client";
import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoFilters from "@/components/TodoFilters";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stateFilter, setStateFilter] = useState("all");
  const [sortType, setSortType] = useState("date");
  const [groupBy, setGroupBy] = useState("none");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <TodoForm setTodos={setTodos} />
      <TodoFilters
        setSortType={setSortType}
        setStateFilter={setStateFilter}
        setGroupBy={setGroupBy}
        sortType={sortType}
        stateFilter={stateFilter}
        groupBy={groupBy}
      />
      <TodoList todos={todos} setTodos={setTodos} sortType={sortType} stateFilter={stateFilter} groupBy={groupBy} />
    </div>
  );
}
