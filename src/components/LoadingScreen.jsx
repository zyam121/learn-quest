export default function LoadingScreen({ message = 'CHARGEMENT...' }) {
  return (
    <div className="loading-screen">
      <div className="loading-ring" />
      <p style={{ marginTop: 18, fontFamily: 'Orbitron', fontSize: '.72rem', letterSpacing: 3, color: 'var(--primary)' }}>
        {message}
      </p>
    </div>
  )
}
