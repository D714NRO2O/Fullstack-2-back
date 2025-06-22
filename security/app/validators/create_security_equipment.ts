import vine from '@vinejs/vine'

export const createSecurityEquipmentValidator = vine.compile(
  vine.object({
    equipmentTypeId: vine.number().positive(),
    location: vine.string().trim().minLength(3).maxLength(100),
    installationDate: vine.date(),
    status: vine.enum(['Active', 'Inactive', 'UnderMaintenance']),
    description: vine.string().maxLength(255).nullable().optional(), // ✅ corregido
  })
)
