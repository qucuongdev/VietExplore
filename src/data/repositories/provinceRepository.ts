import { provinces } from '../provinces';
import { Province, Region } from '@/types/content';

export function getAllProvinces(): Province[] {
  return provinces;
}

export function getProvinceBySlug(slug: string): Province | undefined {
  return provinces.find((p) => p.slug === slug);
}

export function getProvinceById(id: string): Province | undefined {
  return provinces.find((p) => p.id === id);
}

export function getProvincesByRegion(region: Region): Province[] {
  return provinces.filter((p) => p.region === region);
}

export function getCentrallyGovernedCities(): Province[] {
  return provinces.filter((p) => p.kind === 'city');
}

export function getProvincesOnly(): Province[] {
  return provinces.filter((p) => p.kind === 'province');
}
