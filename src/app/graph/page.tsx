'use client'

import { useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState
} from 'reactflow'
import 'reactflow/dist/style.css'
import { supabase } from '@/lib/supabaseClient'

type Skill = {
  id: string
  name: string
  parents: string[] | null
  domain: string
  progress?: number
}

type Resource = {
  id: string
  title: string
  url: string
  notes?: string
}

function getColorByDomain(domain: string): string {
  switch (domain.toLowerCase()) {
    case 'web':
      return '#3b82f6' // bleu
    case 'ia':
      return '#8b5cf6' // violet
    case 'data':
      return '#10b981' // vert
    case 'ux':
      return '#f59e0b' // orange
    default:
      return '#6b7280' // gris
  }
}

export default function SkillGraph() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('*')
      if (error) {
        console.error('Erreur récupération skills:', error)
        return
      }

      const skills = data as Skill[]
      setSkills(skills)

      const nodeList: Node[] = skills.map((skill, index) => ({
        id: skill.id,
        data: {
          label: `${skill.name} (${skill.domain}) — ${skill.progress ?? 0}%`
        },
        position: { x: Math.random() * 500, y: index * 150 },
        style: {
          background: getColorByDomain(skill.domain),
          color: '#fff',
          padding: 10,
          borderRadius: 8,
          fontWeight: 600,
          border: '2px solid #1f2937'
        }
      }))

      const edgeList: Edge[] = skills.flatMap((skill) =>
        (skill.parents ?? []).map((parentId) => ({
          id: `${parentId}->${skill.id}`,
          source: parentId,
          target: skill.id,
          animated: true,
          style: { stroke: '#fff' }
        }))
      )

      setNodes(nodeList)
      setEdges(edgeList)
    }

    fetchSkills()
  }, [])

  const handleNodeClick = async (_: unknown, node: Node) => {
    const skill = skills.find((s) => s.id === node.id)
    if (!skill) return
    setSelectedSkill(skill)

    const { data, error } = await supabase
      .from('resource_skill_link')
      .select('resources (id, title, url)')
      .eq('skill_id', skill.id)

    if (!error && data) {
      const cleaned = data
        .map((link) => link.resources)
        .flat()
        .filter((res): res is Resource => res !== null && typeof res === 'object')
      setResources(cleaned)
    } else {
      setResources([])
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={handleNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {selectedSkill && (
        <div className="absolute top-0 left-0 h-full w-80 bg-[#111827] p-4 border-r border-gray-700 z-10 overflow-y-auto">
          <button
            className="text-gray-400 hover:text-white text-sm mb-4"
            onClick={() => {
              setSelectedSkill(null)
              setResources([])
            }}
          >
            ❌ Fermer
          </button>

          <h2 className="text-xl font-bold mb-2 text-white">
            🧠 {selectedSkill.name}
          </h2>

          <p className="text-sm text-gray-400 mb-2">Domaine : {selectedSkill.domain}</p>
          <p className="text-sm text-gray-400 mb-4">Progression : {selectedSkill.progress ?? 0}%</p>

          <h3 className="text-sm font-semibold text-accent mb-2">📚 Ressources liées</h3>
          {resources.length > 0 ? (
            <ul className="list-disc pl-5 text-sm text-blue-300">
              {resources.map((res) => (
                <li key={res.id}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {res.title}
                  </a>
                  {res.notes && (
                    <p className="mt-2 text-sm italic text-gray-400">
                      {res.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Aucune ressource liée.</p>
          )}

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium">Notes personnelles</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajoute tes remarques, résumés, idées…"
              className="w-full p-2 border rounded-md bg-surface text-white"
            />
          </div>
        </div>
      )}
    </div>
  )
}
