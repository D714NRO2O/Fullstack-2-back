/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// CRUD completo para tipos de equipo
router
  .resource('equipment-types', () => import('#controllers/equipment_types_controller'))
  .apiOnly()

// CRUD completo para equipos de seguridad
router
  .resource('security-equipments', () => import('#controllers/security_equipments_controller'))
  .apiOnly()

// CRUD completo para mantenimientos
router.resource('maintenances', () => import('#controllers/maintenances_controller')).apiOnly()
