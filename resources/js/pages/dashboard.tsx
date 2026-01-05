import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]

const styles = {
  page: {
    padding: '28px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '32px',
    color: '#e5e7eb',
    fontFamily: 'Inter, system-ui, sans-serif',
  },

  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap' as const,
  },

  titleWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },

  title: {
    fontSize: '30px',
    fontWeight: 900,
    background:
      'linear-gradient(90deg, #a78bfa, #22d3ee, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.04em',
  },

  subtitle: {
    fontSize: '14px',
    color: '#c7d2fe',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '22px',
  },

  statCard: {
    padding: '24px',
    borderRadius: '24px',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(0,0,0,0.45))',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    boxShadow:
      '0 30px 90px rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },

  statLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
  },

  statValue: {
    fontSize: '28px',
    fontWeight: 900,
    color: '#f9fafb',
  },

  statDelta: {
    fontSize: '12px',
    color: '#4ade80',
  },

  panel: {
    padding: '32px',
    borderRadius: '28px',
    background:
      'radial-gradient(circle at top left, rgba(99,102,241,0.12), rgba(0,0,0,0.5))',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    boxShadow:
      '0 40px 120px rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
  },

  panelTitle: {
    fontSize: '20px',
    fontWeight: 800,
  },

  panelText: {
    fontSize: '14px',
    color: '#c7d2fe',
    lineHeight: 1.7,
    maxWidth: '640px',
  },
}

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>
              Your workspace overview
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>
              Total Images
            </span>
            <span style={styles.statValue}>24</span>
            <span style={styles.statDelta}>
              +3 this week
            </span>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statLabel}>
              Categories
            </span>
            <span style={styles.statValue}>6</span>
            <span style={styles.statDelta}>
              Organized
            </span>
          </div>

          <div style={styles.statCard}>
            <span style={styles.statLabel}>
              Storage Used
            </span>
            <span style={styles.statValue}>68%</span>
            <span style={styles.statDelta}>
              Within limits
            </span>
          </div>
        </div>

        {/* Main Panel */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>
            Recent Activity
          </h2>

          <p style={styles.panelText}>
            This area can show recent uploads,
            edits, or analytics. The dashboard
            stays clean, modern, and focused —
            no unnecessary controls.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
