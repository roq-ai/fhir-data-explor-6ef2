interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: [],
  tenantRoles: ['Healthcare Professional', 'Administrator', 'Practitioner'],
  tenantName: 'Organization',
  applicationName: 'FHIR Data Explorer',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage organization',
    'Invite Healthcare Professionals and Practitioners',
    'Manage user roles and permissions',
    'Manage access control rules',
    'Manage healthcare provider information',
    'Manage user accounts',
  ],
};
