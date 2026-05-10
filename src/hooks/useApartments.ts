import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Apartment {
  id: string;
  name: string;
  description: string;
  location: string;
  price_per_night: number;
  bedrooms: number;
  max_guests: number;
  image_url: string;
  gallery_urls: string[];
  amenities: string[];
  featured: boolean;
  available: boolean;
}

export function useApartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApartments() {
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .eq('available', true)
        .order('featured', { ascending: false });

      if (!error && data) {
        setApartments(data);
      }
      setLoading(false);
    }

    fetchApartments();
  }, []);

  return { apartments, loading };
}
