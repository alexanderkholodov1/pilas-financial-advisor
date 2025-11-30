-- Seed financial products with realistic Ecuadorian rates

-- Banco Pichincha products
INSERT INTO financial_products (institution_id, name, name_es, type, interest_rate, min_amount, max_amount, min_term_days, max_term_days, features_en, features_es, is_youth_friendly) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Flexible Savings Account', 'Cuenta de Ahorro Flexible', 'savings_flexible', 1.50, 0, NULL, NULL, NULL,
   '["No minimum balance", "Free debit card", "Mobile app access", "Unlimited withdrawals"]',
   '["Sin saldo mínimo", "Tarjeta de débito gratis", "Acceso a app móvil", "Retiros ilimitados"]', TRUE),
  
  ('11111111-1111-1111-1111-111111111111', 'Fixed Term Deposit 90 days', 'Póliza de Acumulación 90 días', 'fixed_term', 5.25, 500, 100000, 90, 90,
   '["Guaranteed return", "Capital protection", "Auto-renewal option"]',
   '["Rendimiento garantizado", "Protección de capital", "Opción de renovación automática"]', TRUE),
  
  ('11111111-1111-1111-1111-111111111111', 'Fixed Term Deposit 180 days', 'Póliza de Acumulación 180 días', 'fixed_term', 6.50, 500, 100000, 180, 180,
   '["Higher interest rate", "Capital protection", "Interest payment options"]',
   '["Mayor tasa de interés", "Protección de capital", "Opciones de pago de intereses"]', TRUE),
  
  ('11111111-1111-1111-1111-111111111111', 'Fixed Term Deposit 360 days', 'Póliza de Acumulación 360 días', 'fixed_term', 7.75, 1000, 500000, 360, 360,
   '["Best annual rate", "Flexible interest payment", "Renewal bonus"]',
   '["Mejor tasa anual", "Pago flexible de intereses", "Bono por renovación"]', FALSE),

-- Banco Guayaquil products
  ('22222222-2222-2222-2222-222222222222', 'Youth Savings Account', 'Cuenta de Ahorro Joven', 'savings_flexible', 2.00, 0, NULL, NULL, NULL,
   '["For ages 18-29", "No maintenance fee", "Cashback rewards", "Financial education"]',
   '["Para edades 18-29", "Sin costo de mantenimiento", "Recompensas cashback", "Educación financiera"]', TRUE),
  
  ('22222222-2222-2222-2222-222222222222', 'Digital Fixed Deposit', 'Depósito a Plazo Digital', 'fixed_term', 6.00, 100, 50000, 30, 365,
   '["Open 100% online", "From $100", "Flexible terms", "Daily interest calculation"]',
   '["Apertura 100% online", "Desde $100", "Plazos flexibles", "Cálculo diario de intereses"]', TRUE),

-- Banco del Pacífico products
  ('33333333-3333-3333-3333-333333333333', 'Basic Savings Account', 'Cuenta de Ahorro Básica', 'savings_flexible', 1.25, 0, NULL, NULL, NULL,
   '["State bank security", "Wide ATM network", "Low requirements"]',
   '["Seguridad de banco estatal", "Amplia red de cajeros", "Bajos requisitos"]', TRUE),
  
  ('33333333-3333-3333-3333-333333333333', 'Pacific Fixed Term', 'Pacífico Plazo Fijo', 'fixed_term', 7.00, 500, 200000, 90, 720,
   '["Competitive state rates", "Multiple term options", "Interest advance available"]',
   '["Tasas estatales competitivas", "Múltiples opciones de plazo", "Anticipo de intereses disponible"]', TRUE),

-- Produbanco products
  ('44444444-4444-4444-4444-444444444444', 'Smart Savings', 'Ahorro Inteligente', 'savings_flexible', 1.75, 0, NULL, NULL, NULL,
   '["AI-powered insights", "Round-up savings", "Goal tracking", "Premium app"]',
   '["Insights con IA", "Ahorro por redondeo", "Seguimiento de metas", "App premium"]', TRUE),
  
  ('44444444-4444-4444-4444-444444444444', 'Premium Fixed Deposit', 'Depósito Premium a Plazo', 'fixed_term', 7.50, 5000, 500000, 180, 720,
   '["Premium rates", "Dedicated advisor", "Priority service"]',
   '["Tasas premium", "Asesor dedicado", "Servicio prioritario"]', FALSE),

-- Cooperativa JEP products
  ('55555555-5555-5555-5555-555555555555', 'JEP Savings Account', 'Cuenta de Ahorro JEP', 'savings_flexible', 3.00, 0, NULL, NULL, NULL,
   '["Highest flexible rate", "Member benefits", "Community support", "No hidden fees"]',
   '["Mayor tasa flexible", "Beneficios de socio", "Apoyo comunitario", "Sin comisiones ocultas"]', TRUE),
  
  ('55555555-5555-5555-5555-555555555555', 'JEP Fixed Term 90 days', 'JEP Plazo Fijo 90 días', 'fixed_term', 8.00, 200, 100000, 90, 90,
   '["Best short-term rate", "Low minimum", "Member exclusive"]',
   '["Mejor tasa a corto plazo", "Mínimo bajo", "Exclusivo para socios"]', TRUE),
  
  ('55555555-5555-5555-5555-555555555555', 'JEP Fixed Term 360 days', 'JEP Plazo Fijo 360 días', 'fixed_term', 9.50, 500, 200000, 360, 360,
   '["Highest annual return", "Flexible interest payment", "Loyalty bonus"]',
   '["Mayor rendimiento anual", "Pago flexible de intereses", "Bono por fidelidad"]', TRUE),

-- Cooperativa Juventud Ecuatoriana products
  ('66666666-6666-6666-6666-666666666666', 'Student First Account', 'Cuenta Primer Estudiante', 'savings_flexible', 2.50, 0, NULL, NULL, NULL,
   '["For students only", "Zero fees", "Financial literacy program", "Micro-savings"]',
   '["Solo para estudiantes", "Cero comisiones", "Programa de educación financiera", "Micro-ahorro"]', TRUE),
  
  ('66666666-6666-6666-6666-666666666666', 'Youth Fixed Deposit', 'Plazo Fijo Juvenil', 'fixed_term', 8.50, 100, 50000, 60, 360,
   '["From just $100", "Youth-focused rates", "Flexible terms"]',
   '["Desde solo $100", "Tasas para jóvenes", "Plazos flexibles"]', TRUE);
