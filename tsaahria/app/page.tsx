import { ReminderForm } from "@/components/reminders/ReminderForm";
import "@/app/globals.css";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">TsaahrIA</h1>
      <ReminderForm />
    </div>
  );
}

