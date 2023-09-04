import axios from 'axios';
import queryString from 'query-string';
import { EncounterInterface, EncounterGetQueryInterface } from 'interfaces/encounter';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getEncounters = async (
  query?: EncounterGetQueryInterface,
): Promise<PaginatedInterface<EncounterInterface>> => {
  const response = await axios.get('/api/encounters', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createEncounter = async (encounter: EncounterInterface) => {
  const response = await axios.post('/api/encounters', encounter);
  return response.data;
};

export const updateEncounterById = async (id: string, encounter: EncounterInterface) => {
  const response = await axios.put(`/api/encounters/${id}`, encounter);
  return response.data;
};

export const getEncounterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/encounters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEncounterById = async (id: string) => {
  const response = await axios.delete(`/api/encounters/${id}`);
  return response.data;
};
