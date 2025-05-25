// Norsk Next.js portefølje – TypeScript-basert
// Komponentbasert struktur med forbedret design per seksjon

import Head from 'next/head'
import { JSX, useEffect, useState } from 'react'
import { FaBriefcase, FaBook, FaProjectDiagram, FaStar, FaHeart, FaCode } from 'react-icons/fa'

// ▶ Definerer TypeScript-typer for porteføljedata
type PortfolioData = {
  general: {
    name: string
    tagline: string
    description: string
  }
  projects: ProjectItem[]
  experience: SectionItem[]
  education: SectionItem[]
  skills: SectionItem[]
  recommendations: SectionItem[]
  hobbies: SectionItem[]
  cvUrl: string
  contact: {
    email: string
  }
}

// ▶ Brukes i alle seksjoner
type SectionItem = {
  title: string
  subtitle?: string
  description?: string
}

// ▶ Prosjektseksjon med bilder og videoeffekt
type ProjectItem = SectionItem & {
  image?: string
  video?: string
}

// ▶ Hovedkomponent
export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((json: PortfolioData) => setData(json))
  }, [])

  if (!data) return <div className="text-center text-lg p-10">Laster inn...</div>

  return (
    <>
      <Head>
      <title>{data.general.name} – Portefølje, prosjekter og erfaring</title>
      <meta name="description" content={data.general.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content={data.general.name} />
      <meta name="keywords" content={`utvikler, programmerer, portefølje, prosjekter, ${data.general.name}`} />
      <meta property="og:title" content={`${data.general.name} – Portefølje`} />
      <meta property="og:description" content={data.general.tagline} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/preview.jpg" />
      <meta property="og:url" content="https://borgar-stensrud.no" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Borgar Flaen Stensrud",
          "url": "https://borgar-stensrud.no",
          "jobTitle": "Fullstack-utvikler og kreativ teknolog",
          "description": "Med over 18 års erfaring innen webutvikling, design og innovasjon, bygger jeg løsninger som begeistrer og fungerer.",
          "email": "borgar@borgar-stensrud.no",
          "image": "https://borgar-stensrud.no/preview.jpg",
          "sameAs": [
            "www.linkedin.com/in/borgar-stensrud-0204181a",
            "https://github.com/borgar90"
          ]
        })}
      </script>

    </Head>

      <main className="p-4 max-w-4xl mx-auto space-y-16">
        <IntroSection name={data.general.name} description={data.general.description} />

        <ProjectSection title="Mine Prosjekt" icon={<FaProjectDiagram />} items={data.projects} />
        <Section title="Arbeidserfaring" icon={<FaBriefcase />} items={data.experience} />
        <Section title="Utdanning" icon={<FaBook />} items={data.education} />
        <Section title="Ferdigheter" icon={<FaCode />} items={data.skills} />
        <Section title="Anbefalinger" icon={<FaStar />} items={data.recommendations} />
        <Section title="Hobbyer" icon={<FaHeart />} items={data.hobbies} />

        <CVSection url={data.cvUrl} />
        <ContactSection email={data.contact.email} />
      </main>
    </>
  )
}

// ▶ Intro-seksjon med forbedret banner-design
function IntroSection({ name, description }: { name: string; description: string }) {
  return (
    <section className="relative text-white rounded-lg shadow-xl overflow-hidden"
    style={{ backgroundImage: 'url(purple-nebula.jpg)',backgroundRepeat:"no-repeat", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="px-6 py-16 text-center relative z-10">
        <h1 className="text-5xl font-extrabold drop-shadow-md mb-4 animate-fade-in-down">{name}</h1>
        <p className="text-lg font-medium max-w-2xl mx-auto animate-fade-in-up">{description}</p>
      </div>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
    </section>
  )
}

// ▶ CV-seksjon
function CVSection({ url }: { url: string }) {
  return (
    <section id="cv">
      <h2 className="text-2xl font-semibold mb-2">📄 CV</h2>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
      >
        Last ned CV
      </a>
    </section>
  )
}

// ▶ Kontakt-seksjon
function ContactSection({ email }: { email: string }) {
  return (
    <section id="kontakt">
      <h2 className="text-2xl font-semibold mb-2">📬 Kontakt</h2>
      <p>
        Send e-post til{' '}
        <a href={`mailto:${email}`} className="text-blue-500 underline">
          {email}
        </a>
      </p>
    </section>
  )
}

// ▶ Generisk seksjonskomponent
function Section({ title, icon, items }: SectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-blue-600">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="bg-white shadow p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            {item.subtitle && <div className="text-sm text-gray-500">{item.subtitle}</div>}
            {item.description && <p className="mt-1 text-gray-700">{item.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

// ▶ Prosjektseksjon med hover-effekt og video som starter umiddelbart
function ProjectSection({ title, icon, items }: SectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-blue-600">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <ul className="grid sm:grid-cols-2 gap-6">
        {(items as ProjectItem[]).map((item, i) => (
          <li key={i} className="relative group rounded-lg overflow-hidden shadow border border-gray-200">
            <div className="aspect-video bg-black relative">
              
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full "
                />
              )}
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              {item.subtitle && <div className="text-sm text-gray-500">{item.subtitle}</div>}
              {item.description && <p className="mt-1 text-gray-700">{item.description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

type SectionProps = {
  title: string
  icon: JSX.Element
  items: SectionItem[]
}



