const mapping: Record<string, string> = {
  encounters: 'encounter',
  medications: 'medication',
  observations: 'observation',
  organizations: 'organization',
  patients: 'patient',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
