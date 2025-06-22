import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import SecurityEquipment from '#models/security_equipment'

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public equipmentId!: number

  @column()
  public type!: 'Corrective' | 'Preventive'

  @column.date()
  public date!: DateTime

  @column()
  public performedBy!: string

  @column()
  public observations!: string | null

  @belongsTo(() => SecurityEquipment)
  public equipment!: BelongsTo<typeof SecurityEquipment>
}
