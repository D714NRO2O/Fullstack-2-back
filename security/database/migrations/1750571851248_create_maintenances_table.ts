import { BaseSchema } from '@adonisjs/lucid/schema'

export default class MaintenancesTable extends BaseSchema {
  protected tableName = 'maintenances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('equipment_id')
        .unsigned()
        .references('id')
        .inTable('security_equipments')
        .onDelete('CASCADE')

      table.enum('type', ['Corrective', 'Preventive']).notNullable()
      table.date('date').notNullable()
      table.string('performed_by').notNullable()
      table.text('observations').nullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
