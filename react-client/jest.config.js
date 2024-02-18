module.exports = {
    preset: 'ts-jest',

    // The root directory that Jest should scan for tests and modules within
    moduleDirectories: ['node_modules', 'src'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    // An array of reporters to use
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './test-results/',
                suiteName: 'Template Tests'
            }
        ]
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/src/index.tsx'],

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The test environment that will be used for testing
    testEnvironment: 'jest-environment-jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.ts?(x)',
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)+(spec|test).ts?(x)',
        '**/?(*.)+(spec|test).js?(x)',
        '**/?(*.)+(spec|test).tsx',
        '**/?(*.)+(spec|test).jsx'
    ],

    // ignore specific folders and files from test
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],

    // A map from regular expressions to paths to transformers
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx,js,jsx}'],

    // Test timeout for individual test cases
    testTimeout: 10000,

    verbose: true
};
