import Maintenance from '#models/maintenance'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class MaintenanceSeeder extends BaseSeeder {
  public async run() {
    for (let i = 0; i < 10; i++) {
      await Maintenance.create({
        equipmentId: faker.number.int({ min: 1, max: 5 }),
        type: faker.helpers.arrayElement(['Corrective', 'Preventive']),
        date: DateTime.fromJSDate(faker.date.recent()),
        performedBy: faker.person.fullName(),
        observations: faker.lorem.paragraph(),
      })
    }
  }
}
