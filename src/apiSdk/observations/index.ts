import axios from 'axios';
import queryString from 'query-string';
import { ObservationInterface, ObservationGetQueryInterface } from 'interfaces/observation';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getObservations = async (
  query?: ObservationGetQueryInterface,
): Promise<PaginatedInterface<ObservationInterface>> => {
  const response = await axios.get('/api/observations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createObservation = async (observation: ObservationInterface) => {
  const response = await axios.post('/api/observations', observation);
  return response.data;
};

export const updateObservationById = async (id: string, observation: ObservationInterface) => {
  const response = await axios.put(`/api/observations/${id}`, observation);
  return response.data;
};

export const getObservationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/observations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteObservationById = async (id: string) => {
  const response = await axios.delete(`/api/observations/${id}`);
  return response.data;
};
