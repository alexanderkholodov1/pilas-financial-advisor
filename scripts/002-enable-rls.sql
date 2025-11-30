-- Enable Row Level Security on all tables

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_tips ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- User savings policies
CREATE POLICY "Users can view their own savings"
  ON user_savings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own savings"
  ON user_savings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings"
  ON user_savings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings"
  ON user_savings FOR DELETE
  USING (auth.uid() = user_id);

-- Institutions - public read access
CREATE POLICY "Anyone can view active institutions"
  ON institutions FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage institutions"
  ON institutions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Financial products - public read access
CREATE POLICY "Anyone can view active products"
  ON financial_products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage products"
  ON financial_products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- User preferences policies
CREATE POLICY "Users can view their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Recommendations policies
CREATE POLICY "Users can view their own recommendations"
  ON recommendations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations"
  ON recommendations FOR UPDATE
  USING (auth.uid() = user_id);

-- Financial tips - public read access
CREATE POLICY "Anyone can view active tips"
  ON financial_tips FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage tips"
  ON financial_tips FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
