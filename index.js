import Table from "./packages/table/src";

// 所有组件列表
const components = [Table];

const install = (app) => {
  // 遍历注册所有组件
  components.map((component) => app.component(component.name, component));
};
export { Table };
export default {
  install,
};
