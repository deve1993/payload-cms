import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs > 0) {
    console.log('Database already seeded. Skipping.')
    process.exit(0)
  }

  const tenant = await payload.create({
    collection: 'tenants',
    data: {
      name: 'Default Tenant',
      slug: 'default',
      domain: 'localhost',
    },
  })

  console.log(`Created tenant: ${tenant.id}`)

  const createUser = payload.create.bind(payload) as (args: {
    collection: string
    data: Record<string, unknown>
  }) => Promise<{ id: string }>

  const user = await createUser({
    collection: 'users',
    data: {
      email: 'admin@pixarts.eu',
      password: 'changeme123',
      role: 'super-admin',
      tenant: tenant.id,
    },
  })

  console.log(`Created super-admin: ${user.id}`)
  console.log('Seed complete. Login with: admin@pixarts.eu / changeme123')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
