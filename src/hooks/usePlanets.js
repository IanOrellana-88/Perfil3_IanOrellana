import { useMemo } from 'react';

import { PLANETS_URL } from '../constants/api';
import useFetchData from './useFetchData';

// Consume la API de planetas y devuelve solo los campos que usa la interfaz.
export default function usePlanets() {
  const { data, loading, error, refetch } = useFetchData(PLANETS_URL);

  const planets = useMemo(() => {
    const items = data?.items ?? [];

    return items.map((planet) => ({
      id: planet.id,
      name: planet.name,
      image: planet.image,
      description: planet.description,
      isDestroyed: planet.isDestroyed,
    }));
  }, [data]);

  return { planets, loading, error, refetch };
}
