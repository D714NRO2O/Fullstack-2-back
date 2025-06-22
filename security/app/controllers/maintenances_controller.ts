import type { HttpContext } from '@adonisjs/core/http'
import Maintenance from '#models/maintenance'
import { createMaintenanceValidator } from '#validators/create_maintenance'
import { DateTime } from 'luxon'

export default class MaintenancesController {
  async index({ response }: HttpContext) {
    const maintenances = await Maintenance.query().preload('equipment')
    return response.ok(maintenances)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createMaintenanceValidator)

    const maintenance = await Maintenance.create({
      ...payload,
      date: DateTime.fromJSDate(payload.date), // ✅ conversión
    })

    return response.created(maintenance)
  }

  async show({ params, response }: HttpContext) {
    const maintenance = await Maintenance.query()
      .where('id', params.id)
      .preload('equipment')
      .first()

    if (!maintenance) {
      return response.notFound({ message: 'Maintenance record not found' })
    }

    return response.ok(maintenance)
  }

  async update({ params, request, response }: HttpContext) {
    const maintenance = await Maintenance.find(params.id)
    if (!maintenance) {
      return response.notFound({ message: 'Maintenance record not found' })
    }

    const data = request.only(['equipmentId', 'type', 'date', 'performedBy', 'observations'])

    if (data.date) {
      data.date = DateTime.fromISO(data.date)
    }

    maintenance.merge(data)
    await maintenance.save()

    return response.ok(maintenance)
  }

  async destroy({ params, response }: HttpContext) {
    const maintenance = await Maintenance.find(params.id)
    if (!maintenance) {
      return response.notFound({ message: 'Maintenance record not found' })
    }

    await maintenance.delete()
    return response.noContent()
  }
}
