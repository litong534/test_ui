import DialogComp from "./Dialog.vue";

export default {
  title: 'Example/Dialog',
  component: DialogComp,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { DialogComp },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<dialog-comp v-bind="args" />',
});

export const Dialog = Template.bind({});
Dialog.args = {
  dataSource: {rows: [{name: '西瓜', price: 10}], total: 100},
  columnDefs: [{prop: 'name', label: '名称'}, {prop: 'price', label: '价格'}]
}
