'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Resource, Skill } from '@/types/types'

export default function HomePage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  const [form, setForm] = useState({
    title: '',
    url: '',
    type: '',
    status: 'à lire',
    tags: '',
    skills: [] as string[]
  })

  const [skillForm, setSkillForm] = useState({
    name: '',
    description: '',
    level: 1,
    domain: ''
  })

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase.from('resources').select('*')
      if (!error && Array.isArray(data)) setResources(data)
    }

    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('*')
      if (!error && Array.isArray(data)) setSkills(data)
    }

    fetchResources()
    fetchSkills()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(o => o.value)
    setForm(prev => ({ ...prev, skills: selectedOptions }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { title, url, type, status, tags, skills: selectedSkills } = form
    const tagArray = tags.split(',').map(t => t.trim())

    const { data, error } = await supabase
      .from('resources')
      .insert([{ title, url, type, status, tags: tagArray }])
      .select()

    if (error || !data || data.length === 0) {
      alert('Erreur : ' + error?.message)
    } else {
      const newResource = data[0]

      await Promise.all(
        selectedSkills.map((skillId) =>
          supabase.from('resource_skill_link').insert({
            resource_id: newResource.id,
            skill_id: skillId
          })
        )
      )

      alert('Ressource ajoutée ✅')
      setResources([...resources, newResource])
      setForm({ title: '', url: '', type: '', status: 'à lire', tags: '', skills: [] })
    }
  }

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSkillForm({ ...skillForm, [e.target.name]: e.target.value })
  }

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, description, level, domain } = skillForm

    const { data, error } = await supabase.from('skills').insert([
      { name, description, level: Number(level), domain }
    ])
    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      alert('Skill ajouté ✅')
      setSkills([...skills, ...(data ?? [])])
      setSkillForm({ name: '', description: '', level: 1, domain: '' })
    }
  }

  const inputStyle = "w-full p-3 bg-surface text-foreground border border-gray-700 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-accent transition"
  const sectionTitle = "text-xl font-semibold mb-4 text-accent"
  const cardStyle = "p-4 bg-surface border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition"

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto font-dev bg-background min-h-screen text-foreground">
      <h1 className="text-3xl font-bold mb-10 text-accent">📁 Ajoute une ressource</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-14">
        <input type="text" name="title" placeholder="Titre" value={form.title} onChange={handleChange} className={inputStyle} required />
        <input type="text" name="url" placeholder="URL" value={form.url} onChange={handleChange} className={inputStyle} required />
        <input type="text" name="type" placeholder="Type (article, vidéo...)" value={form.type} onChange={handleChange} className={inputStyle} />
        <input type="text" name="tags" placeholder="Tags (séparés par des virgules)" value={form.tags} onChange={handleChange} className={inputStyle} />
        <select name="status" value={form.status} onChange={handleChange} className={inputStyle}>
          <option value="à lire">À lire</option>
          <option value="en cours">En cours</option>
          <option value="lu">Lu</option>
        </select>
        <select multiple name="skills" value={form.skills} onChange={handleSkillSelection} className={inputStyle}>
          {skills.map(skill => (
            <option key={skill.id} value={skill.id}>{skill.name} ({skill.domain})</option>
          ))}
        </select>
        <button type="submit" className="bg-accent hover:bg-blue-400 text-black px-6 py-2 rounded shadow transition">
          + Ajouter
        </button>
      </form>

      <h2 className={sectionTitle}>📚 Mes ressources</h2>
      <ul className="space-y-4 mb-20">
        {resources.map((res) => (
          <li key={res.id} className={cardStyle}>
            <p className="font-semibold text-lg">{res.title}</p>
            <p className="text-sm text-gray-400 mb-1">{res.type} – {res.status}</p>
            <a href={res.url} target="_blank" className="text-accent underline">🔗 Lien</a>
            {Array.isArray(res.tags) && res.tags.length > 0 && (
              <p className="text-xs mt-2 text-gray-500">🏷️ {res.tags.join(', ')}</p>
            )}
          </li>
        ))}
      </ul>

      <h1 className="text-3xl font-bold mb-6 text-accent">🧠 Ajoute une compétence</h1>

      <form onSubmit={handleSkillSubmit} className="space-y-4 mb-10">
        <input type="text" name="name" placeholder="Nom" value={skillForm.name} onChange={handleSkillChange} className={inputStyle} required />
        <input type="text" name="description" placeholder="Description" value={skillForm.description} onChange={handleSkillChange} className={inputStyle} />
        <input type="text" name="domain" placeholder="Domaine (IA, frontend...)" value={skillForm.domain} onChange={handleSkillChange} className={inputStyle} />
        <select name="level" value={skillForm.level} onChange={handleSkillChange} className={inputStyle}>
          {[1, 2, 3, 4, 5].map(lvl => <option key={lvl} value={lvl}>Niveau {lvl}</option>)}
        </select>
        <button type="submit" className="bg-green hover:bg-green-300 text-black px-6 py-2 rounded shadow transition">
          + Ajouter le skill
        </button>
      </form>

      <h2 className={sectionTitle}>🗂 Mes compétences</h2>
      <ul className="space-y-4 pb-20">
        {skills.map((skill) => (
          <li key={skill.id} className={cardStyle}>
            <p className="font-bold text-lg">{skill.name} (niveau {skill.level})</p>
            <p className="text-sm text-gray-400">{skill.domain}</p>
            <p className="text-xs text-gray-500">{skill.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
