-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  location TEXT,
  state TEXT,
  preferred_language TEXT DEFAULT 'en',
  farm_size DECIMAL,
  primary_crops TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('farmer', 'agent', 'admin');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'farmer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW_LEVEL SECURITY;

-- Create crops table
CREATE TABLE public.crops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_hindi TEXT,
  name_local TEXT,
  category TEXT NOT NULL,
  season TEXT NOT NULL,
  duration_days INTEGER,
  water_requirement TEXT,
  soil_type TEXT,
  temperature_min INTEGER,
  temperature_max INTEGER,
  expected_yield DECIMAL,
  profit_per_acre DECIMAL,
  image_url TEXT,
  description TEXT,
  farming_tips TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create government schemes table
CREATE TABLE public.government_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_hindi TEXT,
  description TEXT NOT NULL,
  state TEXT,
  category TEXT NOT NULL,
  eligibility TEXT,
  benefits TEXT,
  application_process TEXT,
  documents_required TEXT[],
  application_url TEXT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat conversations table
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create market prices table
CREATE TABLE public.market_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crop_name TEXT NOT NULL,
  market_name TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT,
  price_min DECIMAL NOT NULL,
  price_max DECIMAL NOT NULL,
  price_modal DECIMAL NOT NULL,
  unit TEXT DEFAULT 'quintal',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create RLS policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Chat conversations policies
CREATE POLICY "Users can view their own conversations"
ON public.chat_conversations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
ON public.chat_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
ON public.chat_conversations FOR UPDATE
USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view messages from their conversations"
ON public.chat_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create messages in their conversations"
ON public.chat_messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id AND user_id = auth.uid()
  )
);

-- Public data policies
CREATE POLICY "Anyone can view crops" ON public.crops FOR SELECT USING (true);
CREATE POLICY "Anyone can view government schemes" ON public.government_schemes FOR SELECT USING (true);
CREATE POLICY "Anyone can view market prices" ON public.market_prices FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admins can manage all data" ON public.crops 
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage schemes" ON public.government_schemes 
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage prices" ON public.market_prices 
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'farmer');
  
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

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
('Onion', 'Nashik Mandi', 'Maharashtra', 'Nashik', 1500, 2000, 1750, 'quintal', CURRENT_DATE);