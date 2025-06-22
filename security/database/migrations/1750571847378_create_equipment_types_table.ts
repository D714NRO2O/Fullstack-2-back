import { BaseSchema } from '@adonisjs/lucid/schema'

export default class EquipmentTypesTable extends BaseSchema {
  protected tableName = 'equipment_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
