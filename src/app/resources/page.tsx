'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

// Définition locale des types pour la jointure
type Skill = { id: string; name: string }
type ResourceSkillLink = { skills: Skill | null }
type ResourceWithSkills = {
  id: string
  title: string
  url: string
  type: string
  status: string
  tags?: string[]
  resource_skill_link?: ResourceSkillLink[]
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceWithSkills[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('resources')
        .select(`
          *,
          resource_skill_link (
            skills (
              id,
              name
            )
          )
        `)

      if (error) {
        console.error('Erreur récupération ressources:', error)
      } else {
        setResources(data || [])
      }

      setLoading(false)
    }

    fetchResources()
  }, [])

  return (
    <div className="p-8 text-surface">
      <h1 className="text-3xl font-bold mb-6">📚 Ressources</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-4">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-surface p-4 rounded shadow transition hover:scale-[1.01] border border-accent"
            >
              <h2 className="text-xl font-semibold">{res.title}</h2>
              <p className="text-sm text-muted">
                Type : {res.type} | Statut : {res.status}
              </p>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                📎 Voir la ressource
              </a>
              {Array.isArray(res.resource_skill_link) && res.resource_skill_link.length > 0 && (
                <div className="mt-2 text-sm">
                  <strong>Compétences liées :</strong>{' '}
                  {res.resource_skill_link
                    .map((link: ResourceSkillLink) => link.skills?.name)
                    .filter((name): name is string => Boolean(name))
                    .join(', ')
                  }
                </div>
              )}
              {Array.isArray(res.tags) && res.tags.length > 0 && (
                <div className="mt-1 text-xs text-muted">
                  Tags : {res.tags.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
