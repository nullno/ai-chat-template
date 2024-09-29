
export default function(context) {
  const components = {};
  context.keys().forEach(fileName => {
    const componentConfig = context(fileName);
    const componentName = fileName.replace('.', '').replace(/\//g, '');
    components[componentName] = componentConfig.default || componentConfig;
    //   Vue.component(componentName, componentConfig.default || componentConfig);
  });
  return components;
}
