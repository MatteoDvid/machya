'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Resource = { id: string; title: string; url: string }
type ResourceSkillLink = { resources: Resource | null }
type SkillWithResources = {
  id: string
  name: string
  description: string
  level: number
  domain: string
  resource_skill_link?: ResourceSkillLink[]
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillWithResources[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          resource_skill_link (
            resources (
              id,
              title,
              url
            )
          )
        `)

      if (error) {
        console.error('Erreur chargement compétences:', error)
      } else {
        setSkills(data || [])
      }

      setLoading(false)
    }

    fetchSkills()
  }, [])

  return (
    <div className="p-8 text-surface">
      <h1 className="text-3xl font-bold mb-6">🧠 Mes compétences</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-surface p-4 border border-accent rounded shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{skill.name}</h2>
                <span className="text-sm px-3 py-1 rounded bg-accent text-black">
                  Niveau {skill.level}
                </span>
              </div>
              <p className="text-sm text-gray-400">{skill.domain}</p>
              <p className="text-sm mt-2 text-gray-300">{skill.description}</p>

              {Array.isArray(skill.resource_skill_link) && skill.resource_skill_link.length > 0 && (
                <div className="mt-3 text-sm">
                  <strong>📚 Ressources :</strong>
                  <ul className="list-disc list-inside">
                    {skill.resource_skill_link
                      .filter((link) => link.resources !== null)
                      .map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.resources!.url}
                            className="text-accent underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.resources!.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
