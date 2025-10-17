/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    moduleNameMapper: {
        // Forzamos a que las importaciones .js se resuelvan a archivos .ts
        // para que ts-jest pueda compilarlos.
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    // Archivos a incluir en las pruebas
    testMatch: ['<rootDir>/tests/**/*.test.ts'], // Busca pruebas en la carpeta `tests`
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'], // Carga este archivo antes de las pruebas
    verbose: true,
};
//# sourceMappingURL=jest.config.js.map