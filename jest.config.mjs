import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
}
 
/* Below fix can refer to the link here.
    https://github.com/vercel/next.js/issues/35634
*/
async function jestConfig() {
  const nextJestConfig = await createJestConfig(config)()
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid)/'
  return nextJestConfig
}

export default jestConfig