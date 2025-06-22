import vine from '@vinejs/vine'

export const createEquipmentTypeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(50),
    description: vine.string().maxLength(255).nullable().optional(), // ✅ corregido
  })
)
