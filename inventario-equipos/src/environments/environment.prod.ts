// Sustituye a environment.ts en "ng build --configuration production"
// via fileReplacements en angular.json.
export const environment = {
  production: true,
  // nginx expone la app y hace proxy_pass de /api hacia el contenedor backend
  apiUrl: '/api',
};
