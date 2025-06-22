import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import EquipmentType from '#models/equipment_type'
import Maintenance from '#models/maintenance'

export default class SecurityEquipment extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public equipmentTypeId!: number

  @column()
  public location!: string

  @column.date()
  public installationDate!: DateTime

  @column()
  public status!: 'Active' | 'Inactive' | 'UnderMaintenance'

  @column()
  public description!: string | null

  @belongsTo(() => EquipmentType)
  public type!: BelongsTo<typeof EquipmentType>

  @hasMany(() => Maintenance)
  public maintenances!: HasMany<typeof Maintenance>
}
