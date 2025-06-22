import type { HttpContext } from '@adonisjs/core/http'
import SecurityEquipment from '#models/security_equipment'
import { createSecurityEquipmentValidator } from '#validators/create_security_equipment'
import { DateTime } from 'luxon'

export default class SecurityEquipmentsController {
  async index({ response }: HttpContext) {
    const equipments = await SecurityEquipment.query().preload('type').preload('maintenances')
    return response.ok(equipments)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createSecurityEquipmentValidator)
    const equipment = await SecurityEquipment.create({
      ...payload,
      installationDate: DateTime.fromJSDate(payload.installationDate),
    })
    return response.created(equipment)
  }

  async show({ params, response }: HttpContext) {
    const equipment = await SecurityEquipment.query()
      .where('id', params.id)
      .preload('type')
      .preload('maintenances')
      .first()

    if (!equipment) return response.notFound({ message: 'Security equipment not found' })

    return response.ok(equipment)
  }

  async update({ params, request, response }: HttpContext) {
    const equipment = await SecurityEquipment.find(params.id)
    if (!equipment) return response.notFound({ message: 'Security equipment not found' })

    const data = request.only([
      'equipmentTypeId',
      'location',
      'installationDate',
      'status',
      'description',
    ])

    if (data.installationDate) {
      data.installationDate = DateTime.fromJSDate(data.installationDate)
    }

    equipment.merge(data)
    await equipment.save()

    return response.ok(equipment)
  }

  async destroy({ params, response }: HttpContext) {
    const equipment = await SecurityEquipment.find(params.id)
    if (!equipment) return response.notFound({ message: 'Security equipment not found' })

    await equipment.delete()
    return response.noContent()
  }
}
