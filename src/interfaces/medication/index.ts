import { PatientInterface } from 'interfaces/patient';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MedicationInterface {
  id?: string;
  name: string;
  dosage: string;
  instructions: string;
  dispensing_details: string;
  patient_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MedicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  dosage?: string;
  instructions?: string;
  dispensing_details?: string;
  patient_id?: string;
  user_id?: string;
}
