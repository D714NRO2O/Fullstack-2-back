import SecurityEquipment from '#models/security_equipment'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class SecurityEquipmentSeeder extends BaseSeeder {
  public async run() {
    for (let i = 0; i < 5; i++) {
      await SecurityEquipment.create({
        equipmentTypeId: faker.number.int({ min: 1, max: 3 }),
        location: faker.location.streetAddress(),
        installationDate: DateTime.fromJSDate(faker.date.past()),
        status: faker.helpers.arrayElement(['Active', 'Inactive', 'UnderMaintenance']),
        description: faker.lorem.sentence(),
      })
    }
  }
}
