export type Resource = {
    id: string
    title: string
    url: string
    type?: string
    format?: string
    tags?: string[]
    status?: string
    notes?: string
    skills?: string[]
    created_at?: string
  }
  
  export type Skill = {
    id: string
    name: string
    description?: string
    level?: number
    domain?: string
    parents?: string[]
    resources?: string[]
    created_at?: string
  }
  
  export type ResourceSkillLink = {
    id: string
    resource_id: string
    skill_id: string
    skills?: Skill
  }
  