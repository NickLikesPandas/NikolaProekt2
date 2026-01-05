import { Head, useForm, Link } from '@inertiajs/react'
import { FormEventHandler } from 'react'

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

interface LoginProps {
  status?: string
  canResetPassword: boolean
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
    maxWidth: '420px',
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

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    marginBottom: '24px',
    color: '#d1d5db',
  },

  checkbox: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
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

  status: {
    marginBottom: '16px',
    textAlign: 'center' as const,
    fontSize: '13px',
    color: '#4ade80',
  },
}

export default function Login({
  status,
  canResetPassword,
}: LoginProps) {
  const { data, setData, post, processing, errors, reset } =
    useForm<LoginForm>({
      email: '',
      password: '',
      remember: false,
    })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <>
      <Head title="Log in" />

      <div style={styles.page}>
        <form style={styles.container} onSubmit={submit}>
          <h1 style={styles.heading}>Welcome Back</h1>

          <p style={styles.subtitle}>
            Log in to continue to your dashboard
          </p>

          {status && (
            <div style={styles.status}>{status}</div>
          )}

          <div style={styles.field}>
            <input
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={(e) =>
                setData('email', e.target.value)
              }
              required
              autoFocus
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

          <div style={styles.row}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={data.remember}
                onChange={() =>
                  setData(
                    'remember',
                    !data.remember
                  )
                }
              />
              Remember me
            </label>

            {canResetPassword && (
              <Link
                href={route('password.request')}
                style={styles.link}
              >
                Forgot password?
              </Link>
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
            {processing ? 'Signing in…' : 'Log In'}
          </button>

          <div style={styles.footer}>
            Don’t have an account?{' '}
            <Link
              href={route('register')}
              style={styles.link}
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
