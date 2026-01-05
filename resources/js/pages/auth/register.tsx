import { Head, useForm, Link } from '@inertiajs/react'
import { FormEventHandler } from 'react'

type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'radial-gradient(circle at top, #1e1b4b, #020617)',
    padding: '40px',
  },

  container: {
    width: '100%',
    maxWidth: '440px',
    padding: '44px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '28px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 40px 120px rgba(0,0,0,0.55)',
    color: '#e5e7eb',
    fontFamily: 'Inter, system-ui, sans-serif',
  },

  heading: {
    fontSize: '34px',
    fontWeight: 900,
    textAlign: 'center' as const,
    marginBottom: '12px',
    background:
      'linear-gradient(90deg, #8b5cf6, #22d3ee, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.04em',
  },

  subtitle: {
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#c7d2fe',
    marginBottom: '32px',
  },

  field: {
    marginBottom: '16px',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(0,0,0,0.35)',
    color: '#f9fafb',
    fontSize: '14px',
    outline: 'none',
    backdropFilter: 'blur(10px)',
  },

  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    background:
      'linear-gradient(135deg, #6366f1, #22d3ee)',
    color: '#020617',
    boxShadow:
      '0 10px 40px rgba(34,211,238,0.45)',
  },

  footer: {
    marginTop: '24px',
    textAlign: 'center' as const,
    fontSize: '13px',
    color: '#9ca3af',
  },

  link: {
    color: '#22d3ee',
    textDecoration: 'none',
    fontWeight: 500,
  },

  error: {
    marginTop: '6px',
    fontSize: '12px',
    color: '#f87171',
  },
}

export default function Register() {
  const { data, setData, post, processing, errors, reset } =
    useForm<RegisterForm>({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('register'), {
      onFinish: () =>
        reset('password', 'password_confirmation'),
    })
  }

  return (
    <>
      <Head title="Register" />

      <div style={styles.page}>
        <form style={styles.container} onSubmit={submit}>
          <h1 style={styles.heading}>Create Account</h1>

          <p style={styles.subtitle}>
            Join the platform and get started
          </p>

          <div style={styles.field}>
            <input
              type="text"
              placeholder="Full name"
              value={data.name}
              onChange={(e) =>
                setData('name', e.target.value)
              }
              required
              autoFocus
              style={styles.input}
            />
            {errors.name && (
              <div style={styles.error}>
                {errors.name}
              </div>
            )}
          </div>

          <div style={styles.field}>
            <input
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={(e) =>
                setData('email', e.target.value)
              }
              required
              style={styles.input}
            />
            {errors.email && (
              <div style={styles.error}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={styles.field}>
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData('password', e.target.value)
              }
              required
              style={styles.input}
            />
            {errors.password && (
              <div style={styles.error}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={styles.field}>
            <input
              type="password"
              placeholder="Confirm password"
              value={data.password_confirmation}
              onChange={(e) =>
                setData(
                  'password_confirmation',
                  e.target.value
                )
              }
              required
              style={styles.input}
            />
            {errors.password_confirmation && (
              <div style={styles.error}>
                {errors.password_confirmation}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            style={{
              ...styles.button,
              opacity: processing ? 0.7 : 1,
            }}
          >
            {processing
              ? 'Creating account…'
              : 'Create Account'}
          </button>

          <div style={styles.footer}>
            Already have an account?{' '}
            <Link href={route('login')} style={styles.link}>
              Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
