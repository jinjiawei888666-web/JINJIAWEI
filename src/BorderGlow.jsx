import './BorderGlow.css'

export default function BorderGlow({ children, color, cover }) {
  function handlePointerMove(event) {
    if (event.pointerType === 'touch') return

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const dx = event.clientX - rect.left - rect.width / 2
    const dy = event.clientY - rect.top - rect.height / 2
    const proximity = Math.max(Math.abs(dx) / (rect.width / 2), Math.abs(dy) / (rect.height / 2))
    const glow = Math.min(1, Math.max(0, (proximity - 0.7) / 0.3))
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90

    card.style.setProperty('--edge-proximity', glow.toFixed(3))
    card.style.setProperty('--cursor-angle', `${angle}deg`)
  }

  return (
    <div
      className="border-glow-card"
      style={{ '--glow-color': color }}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => event.currentTarget.style.removeProperty('--edge-proximity')}
      onPointerCancel={(event) => event.currentTarget.style.removeProperty('--edge-proximity')}
    >
      {cover && (
        <span className="border-glow-cover" aria-hidden="true">
          <img src={cover} alt="" loading="lazy" decoding="async" />
        </span>
      )}
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
