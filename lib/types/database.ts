export type UserType = "student" | "small_business" | "enterprise"
export type StorageType = "cash" | "bank_account" | "cooperative" | "investment" | "other"
export type UsageFrequency = "frequent" | "occasional" | "savings_only"
export type RiskTolerance = "low" | "medium" | "high"
export type ProductType = "savings_flexible" | "fixed_term" | "credit" | "investment"
export type TipCategory = "savings" | "investment" | "debt" | "budgeting" | "general"
export type InstitutionType = "bank" | "cooperative" | "investment_fund" | "other"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  user_type: UserType
  is_admin: boolean
  preferred_language: "en" | "es"
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface UserSavings {
  id: string
  user_id: string
  amount: number
  currency: string
  storage_type: StorageType
  institution_id: string | null
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  institution?: Institution
}

export interface Institution {
  id: string
  name: string
  type: InstitutionType
  logo_url: string | null
  website: string | null
  description_en: string | null
  description_es: string | null
  is_active: boolean
  created_at: string
}

export interface FinancialProduct {
  id: string
  institution_id: string
  name: string
  name_es: string
  type: ProductType
  interest_rate: number
  min_amount: number | null
  max_amount: number | null
  min_term_days: number | null
  max_term_days: number | null
  features_en: string[] | null
  features_es: string[] | null
  requirements_en: string[] | null
  requirements_es: string[] | null
  is_youth_friendly: boolean
  is_active: boolean
  last_updated: string
  created_at: string
  institution?: Institution
}

export interface UserPreferences {
  id: string
  user_id: string
  has_bank_account: boolean | null
  primary_institution_id: string | null
  usage_frequency: UsageFrequency | null
  risk_tolerance: RiskTolerance | null
  financial_goals: Record<string, unknown> | null
  monthly_income_range: string | null
  created_at: string
  updated_at: string
}

export interface Recommendation {
  id: string
  user_id: string
  product_id: string | null
  title_en: string
  title_es: string
  description_en: string
  description_es: string
  priority: number
  is_read: boolean
  is_dismissed: boolean
  created_at: string
  product?: FinancialProduct
}

export interface FinancialTip {
  id: string
  title_en: string
  title_es: string
  content_en: string
  content_es: string
  category: TipCategory
  target_user_type: UserType[]
  is_featured: boolean
  is_active: boolean
  created_at: string
}
