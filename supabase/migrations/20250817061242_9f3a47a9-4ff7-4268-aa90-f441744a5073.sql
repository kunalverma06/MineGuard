-- Insert sample data
INSERT INTO public.crops (name, name_hindi, category, season, duration_days, water_requirement, soil_type, temperature_min, temperature_max, expected_yield, profit_per_acre, description, farming_tips) VALUES
('Wheat', 'गेहूं', 'cereals', 'rabi', 120, 'medium', 'loamy', 10, 25, 25, 45000, 'Major food grain crop grown in winter season', 'Sow in November-December. Use certified seeds. Apply balanced fertilizer.'),
('Rice', 'चावल', 'cereals', 'kharif', 150, 'high', 'clay', 20, 35, 30, 55000, 'Main staple food crop grown during monsoon', 'Transplant 25-30 day old seedlings. Maintain 2-3 cm water level.'),
('Cotton', 'कपास', 'fiber', 'kharif', 180, 'medium', 'black', 25, 35, 8, 75000, 'Important cash crop for textile industry', 'Deep plowing required. Plant in May-June. Regular pest monitoring needed.'),
('Sugarcane', 'गन्ना', 'cash', 'annual', 365, 'high', 'loamy', 20, 30, 800, 120000, 'Important cash crop for sugar production', 'Plant quality setts. Provide adequate irrigation. Harvest at maturity.');

INSERT INTO public.government_schemes (name, name_hindi, description, state, category, eligibility, benefits, application_process, documents_required, application_url, is_active) VALUES
('PM-KISAN', 'पीएम-किसान', 'Direct income support to farmers', 'All States', 'Income Support', 'All small and marginal farmers', '₹6000 per year in 3 installments', 'Online application through official portal', ARRAY['Aadhaar Card', 'Bank Account Details', 'Land Records'], 'https://pmkisan.gov.in', true),
('Kisan Credit Card', 'किसान क्रेडिट कार्ड', 'Credit facility for farmers at concessional rates', 'All States', 'Credit', 'All farmers', 'Easy credit access with low interest rates', 'Apply through banks', ARRAY['Land Documents', 'Identity Proof', 'Address Proof'], 'https://kcc.gov.in', true),
('Pradhan Mantri Fasal Bima Yojana', 'प्रधानमंत्री फसल बीमा योजना', 'Crop insurance scheme', 'All States', 'Insurance', 'All farmers', 'Crop loss compensation', 'Through insurance companies', ARRAY['Land Records', 'Bank Account', 'Aadhaar'], 'https://pmfby.gov.in', true);

INSERT INTO public.market_prices (crop_name, market_name, state, district, price_min, price_max, price_modal, unit, date) VALUES
('Wheat', 'Delhi Mandi', 'Delhi', 'Central Delhi', 2100, 2300, 2200, 'quintal', CURRENT_DATE),
('Rice', 'Mumbai Mandi', 'Maharashtra', 'Mumbai', 3000, 3500, 3250, 'quintal', CURRENT_DATE),
('Cotton', 'Ahmedabad Mandi', 'Gujarat', 'Ahmedabad', 5500, 6000, 5750, 'quintal', CURRENT_DATE),
('Onion', 'Nashik Mandi', 'Maharashtra', 'Nashik', 1500, 2000, 1750, 'quintal', CURRENT_DATE),
('Tomato', 'Bangalore Mandi', 'Karnataka', 'Bangalore', 800, 1200, 1000, 'quintal', CURRENT_DATE),
('Potato', 'Agra Mandi', 'Uttar Pradesh', 'Agra', 1200, 1600, 1400, 'quintal', CURRENT_DATE);