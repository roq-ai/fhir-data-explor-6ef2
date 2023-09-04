import { PatientInterface } from 'interfaces/patient';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EncounterInterface {
  id?: string;
  date: any;
  type: string;
  description: string;
  patient_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  user?: UserInterface;
  _count?: {};
}

export interface EncounterGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  description?: string;
  patient_id?: string;
  user_id?: string;
}
