import { Head, Link, usePage } from '@inertiajs/react'
import { SharedData } from '@/types'

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
    maxWidth: '760px',
    width: '100%',
    padding: '48px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '28px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow:
      '0 40px 120px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.1)',
    color: '#e5e7eb',
    textAlign: 'center' as const,
    fontFamily: 'Inter, system-ui, sans-serif',
  },

  heading: {
    fontSize: '40px',
    fontWeight: 900,
    marginBottom: '16px',
    background:
      'linear-gradient(90deg, #8b5cf6, #22d3ee, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.04em',
  },

  subtitle: {
    fontSize: '15px',
    color: '#c7d2fe',
    marginBottom: '40px',
    lineHeight: 1.6,
  },

  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
  },

  button: {
    padding: '14px',
    borderRadius: '16px',
    fontWeight: 700,
    fontSize: '14px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    textDecoration: 'none',
    textAlign: 'center' as const,
    background:
      'linear-gradient(135deg, #6366f1, #22d3ee)',
    color: '#020617',
    boxShadow:
      '0 10px 40px rgba(34,211,238,0.45)',
  },

  secondaryButton: {
    padding: '14px',
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '14px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    border: '1px solid rgba(255,255,255,0.25)',
    color: '#e5e7eb',
    background: 'rgba(0,0,0,0.35)',
  },

  footer: {
    marginTop: '36px',
    fontSize: '12px',
    color: '#9ca3af',
    opacity: 0.8,
  },
}

export default function Welcome() {
  const { auth } = usePage<SharedData>().props

  return (
    <>
      <Head title="Welcome" />

      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.heading}>
            Welcome to my Project! 
          </h1>

          <p style={styles.subtitle}>
            By Nikola Dimitrov III KDM 
          </p>

          <div style={styles.actions}>
            {auth.user ? (
              <Link href={route('dashboard')} style={styles.button}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href={route('login')} style={styles.button}>
                  Log In
                </Link>

                <Link
                  href={route('register')}
                  style={styles.secondaryButton}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          <div style={styles.footer}>
            Laravel • Inertia • React
          </div>
        </div>
      </div>
    </>
  )
}
