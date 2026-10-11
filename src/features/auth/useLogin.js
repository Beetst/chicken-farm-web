import { useState } from 'react'
import { signIn } from './auth.service'

export function useLogin({ onSuccess = ({ user }) => alert(`Logged in as ${user.email}`) } = {}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)
    try {
      onSuccess(await signIn({ email, password }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { email, setEmail, password, setPassword, error, loading, handleSubmit }
}
