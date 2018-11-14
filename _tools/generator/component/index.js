const BASE_PATH = '../../src/';
 module.exports = {
  description: '新增 React Component',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: '輸入 Component 路徑及名稱 (e.g. components/Btn)',
    }
  ],
  actions: (data) => {
    data.path = data.path.replace(/^\/|\/$/g, '');
     const paths = data.path.split('/');
    data.name = paths[paths.length - 1];
    return [
      {
        type: 'add',
        path: `${BASE_PATH}${data.path}/${data.name}.js`,
        templateFile: 'component/class.hbs',
        abortOnFail: true
      }
    ]
  }
};
