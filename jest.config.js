module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '^~(.*)$': '<rootDir>/src/$1',
        '\\.(scss|css|less)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.test.json',
        },
    },
    setupFilesAfterEnv: ['./setup-enzyme-jest.ts'],
};
