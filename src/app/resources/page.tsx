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
  notes?: string
  resource_skill_link?: ResourceSkillLink[]
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceWithSkills[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNotes, setEditNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('resources')
        .select(`
          *,
          notes,
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
              className="flex flex-col md:flex-row gap-4 bg-surface p-4 rounded shadow transition hover:scale-[1.01] border border-accent"
            >
              {/* Bloc principal ressource */}
              <div className="flex-1 min-w-0">
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
              {/* Bloc notes à droite */}
              <div className="md:w-80 w-full bg-[#181f2a] border border-accent/40 rounded-lg p-4 flex flex-col justify-between min-h-[120px]">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent font-semibold text-sm">Notes</span>
                  </div>
                  {editingId === res.id ? (
                    <>
                      <textarea
                        className="w-full p-2 border rounded-md bg-surface text-white mb-2 resize-none h-20"
                        value={editNotes}
                        onChange={e => setEditNotes(e.target.value)}
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <button
                          className="bg-accent text-black px-3 py-1 rounded"
                          disabled={saving}
                          onClick={async () => {
                            setSaving(true)
                            const { error } = await supabase
                              .from('resources')
                              .update({ notes: editNotes })
                              .eq('id', res.id)
                            if (!error) {
                              setResources(resources => resources.map(r => r.id === res.id ? { ...r, notes: editNotes } : r))
                              setEditingId(null)
                            }
                            setSaving(false)
                          }}
                        >
                          💾
                        </button>
                        <button
                          className="text-gray-400 hover:text-white text-sm"
                          onClick={() => setEditingId(null)}
                          disabled={saving}
                        >
                          Annuler
                        </button>
                        {saving && <span className="ml-2 text-xs text-gray-400">Sauvegarde…</span>}
                      </div>
                    </>
                  ) : (
                    <>
                      {res.notes ? (
                        <p className="text-sm italic text-gray-400 whitespace-pre-line">
                          📝 {res.notes}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 italic">Aucune note.</p>
                      )}
                      <button
                        className="text-xs text-accent underline mt-2"
                        onClick={() => {
                          setEditingId(res.id)
                          setEditNotes(res.notes || '')
                        }}
                      >
                        ✏️ Modifier les notes
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
