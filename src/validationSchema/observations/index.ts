import * as yup from 'yup';

export const observationValidationSchema = yup.object().shape({
  type: yup.string().required(),
  result: yup.string().required(),
  date: yup.date().required(),
  patient_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
