// app/components/ReminderForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'
import { z } from 'zod'



// Definindo o tipo de lembrete com validação
const reminderSchema = z.object({
  description: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres."),
  reminderDate: z.string().min(1, "A data/hora é obrigatória."),
})

export const ReminderForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    description: '',
    reminderDate: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Função para manipular a submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validação
      reminderSchema.parse(formData)

      setLoading(true)
      setError('')

      // Inserir no Supabase (banco de dados)
      const { data, error } = await supabase
        .from('reminders')
        .insert([
          {
            description: formData.description,
            reminder_date: formData.reminderDate,
          },
        ])

      if (error) throw error

      // Redireciona ou limpa o formulário após sucesso
      router.push('/reminders')  // Supondo que tenha uma página de listagem de lembretes
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="reminder-form">
      <h2>Criar Lembrete</h2>

      <div>
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Digite o lembrete"
          required
        />
      </div>

      <div>
        <label htmlFor="reminderDate">Data e Hora</label>
        <input
          type="datetime-local"
          id="reminderDate"
          value={formData.reminderDate}
          onChange={(e) => setFormData({ ...formData, reminderDate: e.target.value })}
          required
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Criar Lembrete'}
      </button>
    </form>
  )
}
