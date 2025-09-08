export interface Author {
  id: string
  name: string
  bio?: string
  avatar?: string
  social?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

// Simple Article interface matching blog schema
export interface Article {
  id: number
  title: string
  slug: string
  content: string
  author: string
  featured_image: string | null
  created_at: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PublisherConfig {
  apiKey: string
  apiUrl: string
  publisherId: string
  settings: {
    autoPublish: boolean
    moderationRequired: boolean
    allowedCategories: string[]
  }
}

export interface SearchParams {
  query?: string
  category?: string
  author?: string
  tags?: string[]
  dateFrom?: string
  dateTo?: string
  sortBy?: 'date' | 'views' | 'likes'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}