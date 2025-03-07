"use client";
import { useState } from "react";

export default function ReminderForm() {
  const [reminder, setReminder] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminder.trim()) return;
    console.log("Lembrete:", reminder); // Depois trocamos isso pelo Supabase
    setReminder("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 shadow-lg rounded-lg">
      <textarea
        className="border p-2 rounded-lg w-full"
        placeholder="Digite seu lembrete..."
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Salvar Lembrete</button>
    </form>
  );
}
