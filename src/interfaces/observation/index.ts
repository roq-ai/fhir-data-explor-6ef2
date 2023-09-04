import { PatientInterface } from 'interfaces/patient';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ObservationInterface {
  id?: string;
  type: string;
  result: string;
  date: any;
  patient_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ObservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  result?: string;
  patient_id?: string;
  user_id?: string;
}
