import type { HttpContext } from '@adonisjs/core/http'
import EquipmentType from '#models/equipment_type'
import { createEquipmentTypeValidator } from '#validators/create_equipment_type'

export default class EquipmentTypesController {
  async index({ response }: HttpContext) {
    const types = await EquipmentType.all()
    return response.ok(types)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEquipmentTypeValidator)
    const type = await EquipmentType.create(payload)
    return response.created(type)
  }

  async show({ params, response }: HttpContext) {
    const type = await EquipmentType.find(params.id)
    if (!type) return response.notFound({ message: 'Equipment type not found' })
    return response.ok(type)
  }

  async update({ params, request, response }: HttpContext) {
    const type = await EquipmentType.find(params.id)
    if (!type) return response.notFound({ message: 'Equipment type not found' })

    const data = request.only(['name', 'description'])
    type.merge(data)
    await type.save()

    return response.ok(type)
  }

  async destroy({ params, response }: HttpContext) {
    const type = await EquipmentType.find(params.id)
    if (!type) return response.notFound({ message: 'Equipment type not found' })

    await type.delete()
    return response.noContent()
  }
}
