import vine from '@vinejs/vine'

export const createMaintenanceValidator = vine.compile(
  vine.object({
    equipmentId: vine.number().positive(),
    type: vine.enum(['Corrective', 'Preventive']),
    date: vine.date(),
    performedBy: vine.string().trim().minLength(3).maxLength(100),
    observations: vine.string().maxLength(500).nullable().optional(), // ✅ corregido
  })
)
