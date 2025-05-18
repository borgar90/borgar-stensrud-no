// Norsk Next.js portefølje – JSON-basert innhold
// Strukturen basert på enkel oppdatering via datafiler

import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then(setData)
  }, [])

  if (!data) return <div>Laster inn...</div>

  return (
    <>
      <Head>
        <title>{data.general.name} – Portefølje</title>
        <meta name="description" content={data.general.tagline} />
      </Head>

      <main className="p-4 max-w-4xl mx-auto">
        <section id="intro" className="mb-10">
          <h1 className="text-3xl font-bold">{data.general.name}</h1>
          <p>{data.general.description}</p>
        </section>

        <Section title="Prosjekter" items={data.projects} />
        <Section title="Arbeidserfaring" items={data.experience} />
        <Section title="Utdanning" items={data.education} />
        <Section title="Ferdigheter" items={data.skills} />
        <Section title="Anbefalinger" items={data.recommendations} />
        <Section title="Hobbyer" items={data.hobbies} />

        <section id="cv" className="mb-10">
          <h2 className="text-2xl font-semibold">CV</h2>
          <a href={data.cvUrl} target="_blank" className="text-blue-500 underline">Last ned CV</a>
        </section>

        <section id="kontakt" className="mb-10">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p>Send e-post til <a href={`mailto:${data.contact.email}`} className="text-blue-500 underline">{data.contact.email}</a></p>
        </section>
      </main>
    </>
  )
}

function Section({ title, items }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="border-b pb-2">
            <strong>{item.title}</strong>
            {item.subtitle && <div className="text-sm text-gray-600">{item.subtitle}</div>}
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
