module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'warn',
    // 允许 子域有父领 同名变量名
    'no-shadow': 'off',
    // 关闭换行检测
    'linebreak-style': 'off',
    // 禁掉不改变变量必须用const
    'prefer-const': 'off',
    'no-unused-vars': 'off',
    'array-callback-return': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/no-cycle': 'off',
    'no-mixed-spaces-and-tabs': 0,
    'max-len': ['error', { code: 10000 }]
  }
}
