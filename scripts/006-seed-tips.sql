-- Seed financial tips and educational content

INSERT INTO financial_tips (title_en, title_es, content_en, content_es, category, target_user_type, is_featured) VALUES
  ('Banks vs Cooperatives: Which is better for you?', 
   'Bancos vs Cooperativas: ¿Cuál es mejor para ti?',
   'Banks offer wider ATM networks and international services, while cooperatives typically offer higher interest rates on savings and lower rates on loans. Cooperatives are member-owned, meaning profits go back to members. Consider a bank if you need international transfers or travel frequently. Choose a cooperative if you prioritize higher returns on your savings and want to support your community.',
   'Los bancos ofrecen redes de cajeros más amplias y servicios internacionales, mientras que las cooperativas típicamente ofrecen tasas de interés más altas en ahorros y más bajas en préstamos. Las cooperativas son propiedad de sus socios, lo que significa que las ganancias vuelven a los miembros. Considera un banco si necesitas transferencias internacionales o viajas frecuentemente. Elige una cooperativa si priorizas mayores rendimientos en tus ahorros y quieres apoyar a tu comunidad.',
   'savings', ARRAY['student', 'small_business'], TRUE),
  
  ('The Power of Compound Interest',
   'El Poder del Interés Compuesto',
   'Compound interest is interest earned on both your initial deposit and the accumulated interest. Starting early is key: $500 invested at 8% annually becomes $1,079 in 10 years without adding anything! In Ecuador, cooperatives often offer the best compound interest rates on fixed-term deposits.',
   'El interés compuesto es el interés ganado tanto sobre tu depósito inicial como sobre el interés acumulado. Empezar temprano es clave: ¡$500 invertidos al 8% anual se convierten en $1,079 en 10 años sin agregar nada! En Ecuador, las cooperativas suelen ofrecer las mejores tasas de interés compuesto en depósitos a plazo fijo.',
   'investment', ARRAY['student'], TRUE),
  
  ('Building Your Emergency Fund',
   'Construyendo tu Fondo de Emergencia',
   'Financial experts recommend having 3-6 months of expenses saved. Start small: even $50/month adds up to $600/year. Keep your emergency fund in a flexible savings account where you can access it quickly but still earn some interest.',
   'Los expertos financieros recomiendan tener ahorrados de 3 a 6 meses de gastos. Empieza pequeño: incluso $50/mes suma $600/año. Mantén tu fondo de emergencia en una cuenta de ahorro flexible donde puedas acceder rápidamente pero aún ganar algo de interés.',
   'savings', ARRAY['student', 'small_business'], TRUE),
  
  ('Understanding Fixed-Term Deposits (Plazo Fijo)',
   'Entendiendo los Depósitos a Plazo Fijo',
   'Fixed-term deposits lock your money for a set period (30-360+ days) in exchange for higher interest rates. The longer the term, the higher the rate. In Ecuador, rates range from 5% to 9.5% annually. Only deposit money you won''t need during the term to avoid early withdrawal penalties.',
   'Los depósitos a plazo fijo bloquean tu dinero por un período establecido (30-360+ días) a cambio de tasas de interés más altas. Cuanto más largo el plazo, mayor la tasa. En Ecuador, las tasas van del 5% al 9.5% anual. Solo deposita dinero que no necesitarás durante el plazo para evitar penalidades por retiro anticipado.',
   'investment', ARRAY['student', 'small_business'], TRUE),
  
  ('The 50/30/20 Budget Rule',
   'La Regla del Presupuesto 50/30/20',
   'Allocate 50% of income to needs (rent, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. This simple framework helps maintain financial balance without feeling overly restricted.',
   'Asigna el 50% de tus ingresos a necesidades (arriendo, comida, servicios), 30% a deseos (entretenimiento, salir a comer), y 20% a ahorro y pago de deudas. Este marco simple ayuda a mantener el equilibrio financiero sin sentirse demasiado restringido.',
   'budgeting', ARRAY['student', 'small_business', 'enterprise'], FALSE),
  
  ('Avoiding High-Interest Debt Traps',
   'Evitando Trampas de Deuda con Alto Interés',
   'Credit cards and quick loans can charge 15-30% annual interest. Before borrowing, compare rates across institutions. If you have existing high-interest debt, prioritize paying it off before making new investments.',
   'Las tarjetas de crédito y préstamos rápidos pueden cobrar del 15% al 30% de interés anual. Antes de pedir prestado, compara tasas entre instituciones. Si tienes deuda existente con alto interés, prioriza pagarla antes de hacer nuevas inversiones.',
   'debt', ARRAY['student', 'small_business'], TRUE),
  
  ('Why Your Credit Score Matters',
   'Por Qué Importa tu Puntaje Crediticio',
   'Your credit score affects loan approval and interest rates. In Ecuador, a good credit history opens doors to better financial products. Pay bills on time, keep credit card usage below 30% of your limit, and avoid having too many credit inquiries.',
   'Tu puntaje crediticio afecta la aprobación de préstamos y las tasas de interés. En Ecuador, un buen historial crediticio abre puertas a mejores productos financieros. Paga las cuentas a tiempo, mantén el uso de tarjeta de crédito por debajo del 30% de tu límite, y evita tener demasiadas consultas de crédito.',
   'general', ARRAY['student', 'small_business', 'enterprise'], FALSE),
  
  ('Starting a Business? Separate Personal and Business Finances',
   '¿Empezando un Negocio? Separa las Finanzas Personales y del Negocio',
   'Open a dedicated business account from day one. This makes tax filing easier, provides better financial visibility, and builds your business credit history. Many banks offer zero-fee business accounts for new entrepreneurs.',
   'Abre una cuenta dedicada para el negocio desde el primer día. Esto facilita la declaración de impuestos, proporciona mejor visibilidad financiera y construye tu historial crediticio empresarial. Muchos bancos ofrecen cuentas empresariales sin costo para nuevos emprendedores.',
   'general', ARRAY['small_business', 'enterprise'], FALSE);
