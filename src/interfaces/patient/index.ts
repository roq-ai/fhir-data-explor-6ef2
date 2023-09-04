import { EncounterInterface } from 'interfaces/encounter';
import { MedicationInterface } from 'interfaces/medication';
import { ObservationInterface } from 'interfaces/observation';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  first_name: string;
  last_name: string;
  dob: any;
  gender: string;
  address: string;
  phone: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  encounter?: EncounterInterface[];
  medication?: MedicationInterface[];
  observation?: ObservationInterface[];
  organization?: OrganizationInterface;
  _count?: {
    encounter?: number;
    medication?: number;
    observation?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  address?: string;
  phone?: string;
  organization_id?: string;
}
