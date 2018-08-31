module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  rules: {
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'import/no-extraneous-dependencies': 'disable',
    'no-param-reassign': 0,
    'no-trailing-spaces': 0,
    'no-underscore-dangle': 0,
  },
  env: {
    'jest/globals': true,
  },
};
