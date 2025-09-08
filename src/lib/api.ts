import { Article, Category, ApiResponse, PaginatedResponse, SearchParams } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Article endpoints
  async getArticles(params?: SearchParams): Promise<PaginatedResponse<Article>> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v))
          } else {
            queryParams.append(key, String(value))
          }
        }
      })
    }

    const response = await this.fetchWithAuth<PaginatedResponse<Article>>(
      `/articles?${queryParams.toString()}`
    )
    return response.data
  }

  async getArticleBySlug(slug: string): Promise<Article> {
    const response = await this.fetchWithAuth<Article>(`/articles/${slug}`)
    return response.data
  }

  async getFeaturedArticles(): Promise<Article[]> {
    const response = await this.fetchWithAuth<Article[]>('/articles/featured')
    return response.data
  }

  async getArticlesByCategory(categorySlug: string, page = 1, limit = 12): Promise<PaginatedResponse<Article>> {
    const response = await this.fetchWithAuth<PaginatedResponse<Article>>(
      `/articles/category/${categorySlug}?page=${page}&limit=${limit}`
    )
    return response.data
  }

  // Category endpoints
  async getCategories(): Promise<Category[]> {
    const response = await this.fetchWithAuth<Category[]>('/categories')
    return response.data
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await this.fetchWithAuth<Category>(`/categories/${slug}`)
    return response.data
  }

  // Search
  async searchArticles(query: string, filters?: Partial<SearchParams>): Promise<PaginatedResponse<Article>> {
    const params: SearchParams = {
      query,
      ...filters,
    }
    return this.getArticles(params)
  }

  // Analytics
  async incrementArticleView(articleId: string): Promise<void> {
    await this.fetchWithAuth(`/articles/${articleId}/view`, {
      method: 'POST',
    })
  }

  async likeArticle(articleId: string): Promise<void> {
    await this.fetchWithAuth(`/articles/${articleId}/like`, {
      method: 'POST',
    })
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient(API_BASE_URL)

export default apiClient

// Export specific functions for convenience
export const {
  getArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getArticlesByCategory,
  getCategories,
  getCategoryBySlug,
  searchArticles,
  incrementArticleView,
  likeArticle,
} = apiClient