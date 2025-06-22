import EquipmentType from '#models/equipment_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class EquipmentTypeSeeder extends BaseSeeder {
  public async run() {
    await EquipmentType.createMany([
      { name: 'Camera', description: 'Surveillance camera' },
      { name: 'Alarm', description: 'Fire or intrusion alarm' },
      { name: 'Motion Sensor', description: 'Detects movement' },
    ])
  }
}
