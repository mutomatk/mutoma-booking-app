/*
  # Create apartments and bookings tables

  1. New Tables
    - `apartments`
      - `id` (uuid, primary key)
      - `name` (text, apartment name)
      - `description` (text, apartment description)
      - `location` (text, location in Ndola, Zambia)
      - `price_per_night` (numeric, price in ZMW)
      - `bedrooms` (integer, number of bedrooms)
      - `max_guests` (integer, maximum guest capacity)
      - `image_url` (text, main image URL)
      - `gallery_urls` (text array, additional image URLs)
      - `amenities` (text array, list of amenities)
      - `featured` (boolean, whether apartment is featured)
      - `available` (boolean, whether apartment is available for booking)
      - `created_at` (timestamptz)
    - `bookings`
      - `id` (uuid, primary key)
      - `apartment_id` (uuid, foreign key to apartments)
      - `full_name` (text, guest full name)
      - `phone_number` (text, guest phone number)
      - `check_in` (date, check-in date)
      - `check_out` (date, check-out date)
      - `guests` (integer, number of guests)
      - `payment_method` (text, e.g. 'airtel_momo', 'mtn_momo', 'zamtel_momo', 'bank_transfer')
      - `total_price` (numeric, total booking price in ZMW)
      - `status` (text, booking status: 'pending', 'confirmed', 'cancelled')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Apartments: anyone can read, only service role can insert/update/delete
    - Bookings: anyone can insert (for booking flow), only service role can read/update/delete

  3. Important Notes
    - Apartments are seeded with sample data for Ndola, Zambia
    - Bookings use a 'pending' status by default until payment is confirmed
    - Prices are in Zambian Kwacha (ZMW)
*/

CREATE TABLE IF NOT EXISTS apartments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT 'Itawa, Ndola',
  price_per_night numeric NOT NULL DEFAULT 0,
  bedrooms integer NOT NULL DEFAULT 1,
  max_guests integer NOT NULL DEFAULT 2,
  image_url text NOT NULL DEFAULT '',
  gallery_urls text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view apartments"
  ON apartments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apartment_id uuid NOT NULL REFERENCES apartments(id),
  full_name text NOT NULL,
  phone_number text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  payment_method text NOT NULL,
  total_price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Seed apartments with sample data
INSERT INTO apartments (name, description, location, price_per_night, bedrooms, max_guests, image_url, gallery_urls, amenities, featured, available) VALUES
(
  'The Royal Suite',
  'An exquisite luxury suite featuring panoramic views of Ndola''s skyline. Italian marble bathrooms, king-size bed with Egyptian cotton linens, and a private balcony for sunset dining.',
  'Itawa, Ndola',
  2500,
  3,
  6,
  'https://images.pexels.com/photos/1579166/pexels-photo-1579166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY[
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ],
  ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Kitchen', 'Parking', 'Security', 'Pool Access'],
  true,
  true
),
(
  'The Garden Villa',
  'A serene villa surrounded by lush gardens. Features an open-plan living area, gourmet kitchen, and a private courtyard with outdoor seating perfect for entertaining.',
  'Itawa, Ndola',
  1800,
  2,
  4,
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY[
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ],
  ARRAY['WiFi', 'Garden', 'Kitchen', 'Parking', 'Washer', 'Outdoor Dining'],
  true,
  true
),
(
  'The Executive Loft',
  'A modern loft apartment with industrial-chic design. Floor-to-ceiling windows, premium furnishings, and a rooftop terrace with city views. Ideal for business travelers.',
  'Itawa, Ndola',
  1500,
  1,
  2,
  'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY[
    'https://images.pexels.com/photos/111590/pexels-photo-111590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ],
  ARRAY['WiFi', 'Air Conditioning', 'Workspace', 'Smart TV', 'Gym Access', 'Concierge'],
  false,
  true
),
(
  'The Family Residence',
  'Spacious family-friendly residence with multiple bedrooms, a play area, and a fully equipped kitchen. Safe neighborhood with easy access to schools and shopping.',
  'Itawa, Ndola',
  2200,
  4,
  8,
  'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY[
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ],
  ARRAY['WiFi', 'Kitchen', 'Parking', 'Washer', 'Play Area', 'Garden', 'Security'],
  true,
  true
),
(
  'The Studio Retreat',
  'A cozy studio apartment perfect for solo travelers or couples. Compact yet beautifully designed with premium finishes and a relaxing ambiance.',
  'Itawa, Ndola',
  900,
  1,
  2,
  'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY[
    'https://images.pexels.com/photos/1579166/pexels-photo-1579166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ],
  ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Kitchenette'],
  false,
  true
),
(
  'The Penthouse',
  'The crown jewel of our collection. A stunning penthouse with wraparound terraces, designer interiors, private elevator access, and 360-degree views of Ndola.',
  'Itawa, Ndola',
  4500,
  4,
  8,
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY[
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ],
  ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Kitchen', 'Parking', 'Pool', 'Gym', 'Concierge', 'Private Elevator', 'Terrace'],
  true,
  true
);
