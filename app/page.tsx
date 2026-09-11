import Link from "next/link";

const services=[
  {
    number:"01",
    title:"Auto Insurance",
    text:"We help you find the coverage you need for your car without paying for things you do not need."
  },
  {
    number:"02",
    title:"Home Insurance",
    text:"Protect your home and belongings with coverage that makes sense for your property and your budget."
  },
  {
    number:"03",
    title:"Life Insurance",
    text:"Simple life insurance options to help protect the people who depend on you."
  }
];

export default function Home(){
  return <>
    <section className="hero">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow">Local insurance help in Van Nuys, California</p>
          <h1>Same coverage.<br/><em>Better value.</em></h1>
          <p className="hero-copy">Tell us what you need and we’ll do the work. We compare your options, explain them clearly, and help you find coverage that fits your needs and your budget.</p>
          <div className="actions">
            <a className="button primary" href="tel:+18005424242">Call 1-800-542-4242</a>
            <Link className="button secondary" href="/contact">Get a quote</Link>
          </div>
        </div>
        <aside className="quote-card">
          <span className="kite-mark">◆</span>
          <p className="quote-kicker">David Carranza</p>
          <h2>We make insurance simple.</h2>
          <p>You tell us what you need. We do everything we can to find coverage that protects what matters at a rate that fits your budget.</p>
          <dl>
            <div><dt>Services</dt><dd>Auto, Home and Life</dd></div>
            <div><dt>Office</dt><dd>Van Nuys, CA</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section className="services shell" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">What we can help with</p>
          <h2>Protect what matters.<br/>Pay what makes sense.</h2>
        </div>
      </div>
      <div className="service-grid">
        {services.map(s=>
          <article className="service" key={s.title}>
            <span>{s.number}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <Link href="/contact">Get a quote <b>→</b></Link>
          </article>
        )}
      </div>
    </section>

    <section className="trust">
      <div className="shell trust-grid">
        <div>
          <p className="eyebrow light">Real help from a real person</p>
          <h2>We do the work.<br/>You get the options.</h2>
        </div>
        <div>
          <p>We take the time to understand what you actually need. Then we look for practical coverage at a price that makes sense. No pressure. No confusing insurance talk. Just real help.</p>
          <Link className="text-link" href="/contact">See how much you can save →</Link>
        </div>
      </div>
    </section>
  </>
}
