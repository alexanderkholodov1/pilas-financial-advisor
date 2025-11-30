-- Pila$ Database Schema
-- Version 1.0 - Initial Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reordered tables: institutions must be created BEFORE user_savings references it

-- Financial institutions (banks, cooperatives) - CREATED FIRST
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank', 'cooperative', 'investment_fund', 'other')),
  logo_url TEXT,
  website TEXT,
  description_en TEXT,
  description_es TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  user_type TEXT NOT NULL DEFAULT 'student' CHECK (user_type IN ('student', 'small_business', 'enterprise')),
  is_admin BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'es' CHECK (preferred_language IN ('en', 'es')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User savings entries (manual input by users) - NOW institutions exists
CREATE TABLE IF NOT EXISTS user_savings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  storage_type TEXT NOT NULL CHECK (storage_type IN ('cash', 'bank_account', 'cooperative', 'investment', 'other')),
  institution_id UUID REFERENCES institutions(id),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank rates and financial products
CREATE TABLE IF NOT EXISTS financial_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_es TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('savings_flexible', 'fixed_term', 'credit', 'investment')),
  interest_rate DECIMAL(5, 2) NOT NULL,
  min_amount DECIMAL(12, 2),
  max_amount DECIMAL(12, 2),
  min_term_days INTEGER,
  max_term_days INTEGER,
  features_en JSONB,
  features_es JSONB,
  requirements_en JSONB,
  requirements_es JSONB,
  is_youth_friendly BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User financial goals and preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  has_bank_account BOOLEAN,
  primary_institution_id UUID REFERENCES institutions(id),
  usage_frequency TEXT CHECK (usage_frequency IN ('frequent', 'occasional', 'savings_only')),
  risk_tolerance TEXT CHECK (risk_tolerance IN ('low', 'medium', 'high')),
  financial_goals JSONB,
  monthly_income_range TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated recommendations for users
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES financial_products(id),
  title_en TEXT NOT NULL,
  title_es TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_es TEXT NOT NULL,
  priority INTEGER DEFAULT 1,
  is_read BOOLEAN DEFAULT FALSE,
  is_dismissed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial tips and educational content
CREATE TABLE IF NOT EXISTS financial_tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_es TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_es TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('savings', 'investment', 'debt', 'budgeting', 'general')),
  target_user_type TEXT[] DEFAULT ARRAY['student', 'small_business', 'enterprise'],
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_savings_user_id ON user_savings(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_products_institution ON financial_products(institution_id);
CREATE INDEX IF NOT EXISTS idx_financial_products_type ON financial_products(type);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
