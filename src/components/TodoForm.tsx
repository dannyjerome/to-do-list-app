"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types";

interface TodoFormProps {
  setTodos: (todos: (prev: Todo[]) => Todo[]) => void;
}

export default function TodoForm({ setTodos }: TodoFormProps) {
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        state: "pending",
        date: new Date().toISOString(),
      },
    ]);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
        placeholder="New todo..."
      />
      <Button onClick={addTodo}>Add</Button>
    </div>
  );
}
