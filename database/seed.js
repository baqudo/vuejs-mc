/* eslint-env node */
import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)

const seedProjects = async (entriesCount = 10) => {
  const arr = []

  for (let i = 0; i < entriesCount; i++) {
    const name = faker.lorem.words(3)

    arr.push({
      name,
      slug: faker.helpers.slugify(name).toLowerCase(),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5]),
    })
  }

  await supabase.from('projects').insert(arr)
}

await seedProjects(10)
