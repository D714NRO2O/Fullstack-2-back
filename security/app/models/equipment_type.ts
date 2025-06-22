import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import SecurityEquipment from '#models/security_equipment'

export default class EquipmentType extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public description!: string | null

  @hasMany(() => SecurityEquipment)
  public equipments!: HasMany<typeof SecurityEquipment>
}
