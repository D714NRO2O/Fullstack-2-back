import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SecurityEquipmentsTable extends BaseSchema {
  protected tableName = 'security_equipments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('equipment_type_id')
        .unsigned()
        .references('id')
        .inTable('equipment_types')
        .onDelete('CASCADE')

      table.string('location').notNullable()
      table.date('installation_date').notNullable()
      table.enum('status', ['Active', 'Inactive', 'UnderMaintenance']).notNullable()
      table.text('description').nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
