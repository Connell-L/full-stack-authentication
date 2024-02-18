module.exports = {
    // The root directory that Jest should scan for tests and modules within
    moduleDirectories: ['node_modules', 'src'],

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'node', 'mjs', 'cjs'],

    // default timeout for all tests
    testTimeout: 10000,

    // Array of reporters to use
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
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/src/index.js'],

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.js', '**/__tests__/**/*.cjs', '**/?(*.)+(spec|test).js', '**/?(*.)+(spec|test).cjs'],

    // ignore specific folders and files from test
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.cjs$': 'babel-jest'
    },

    verbose: true
};
