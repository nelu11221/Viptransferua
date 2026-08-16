export default function SectionHead({ title, subtitle }) {
  return (
    <div className="section__head">
      <h2 className="section__title">{title}</h2>
      {subtitle && <p className="section__subtitle">{subtitle}</p>}
    </div>
  )
}
