-- Seed Ecuadorian financial institutions

INSERT INTO institutions (id, name, type, website, description_en, description_es, is_active) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Banco Pichincha', 'bank', 'https://www.pichincha.com', 
   'Ecuador''s largest private bank with extensive branch network and digital services.',
   'El banco privado más grande del Ecuador con amplia red de sucursales y servicios digitales.', TRUE),
  
  ('22222222-2222-2222-2222-222222222222', 'Banco Guayaquil', 'bank', 'https://www.bancoguayaquil.com',
   'Major Ecuadorian bank known for innovation and customer service.',
   'Banco ecuatoriano reconocido por su innovación y servicio al cliente.', TRUE),
  
  ('33333333-3333-3333-3333-333333333333', 'Banco del Pacífico', 'bank', 'https://www.bancodelpacifico.com',
   'State-owned bank with competitive rates and nationwide coverage.',
   'Banco estatal con tasas competitivas y cobertura nacional.', TRUE),
  
  ('44444444-4444-4444-4444-444444444444', 'Produbanco', 'bank', 'https://www.produbanco.com.ec',
   'Part of Promerica group, offering modern banking solutions.',
   'Parte del grupo Promerica, ofrece soluciones bancarias modernas.', TRUE),
  
  ('55555555-5555-5555-5555-555555555555', 'Cooperativa JEP', 'cooperative', 'https://www.jep.coop',
   'Ecuador''s largest credit union with attractive rates for members.',
   'La cooperativa de ahorro y crédito más grande del Ecuador con tasas atractivas para socios.', TRUE),
  
  ('66666666-6666-6666-6666-666666666666', 'Cooperativa Juventud Ecuatoriana Progresista', 'cooperative', 'https://www.coopjep.fin.ec',
   'Youth-focused cooperative with accessible financial products.',
   'Cooperativa enfocada en jóvenes con productos financieros accesibles.', TRUE),
  
  ('77777777-7777-7777-7777-777777777777', 'Banco Internacional', 'bank', 'https://www.bancointernacional.com.ec',
   'Traditional bank with solid reputation and diverse product portfolio.',
   'Banco tradicional con sólida reputación y diverso portafolio de productos.', TRUE),
  
  ('88888888-8888-8888-8888-888888888888', 'Cooperativa Alianza del Valle', 'cooperative', 'https://www.alianzadelvalle.fin.ec',
   'Community cooperative serving the Quito valley region.',
   'Cooperativa comunitaria que sirve a la región del valle de Quito.', TRUE),
  
  ('99999999-9999-9999-9999-999999999999', 'Banco Bolivariano', 'bank', 'https://www.bolivariano.com',
   'Business-oriented bank with competitive corporate services.',
   'Banco orientado a empresas con servicios corporativos competitivos.', TRUE);
