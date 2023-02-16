<template>
  <el-button type="primary" @click="handleOpen">打开对话框</el-button>
  <tl-dialog :show="vBtn" :pagination="sbPgnation" @sizeChange="handleSizeChange" @sortChange="handleSortChange" @currentChange="handleCurrentChange" @selected="handleSelectionChange" @close="handleClose" :column-defs="columnDefs" :data-source="tableData"></tl-dialog>
</template>

<script>
import TlDialog from '../packages/dialog/src/index'
import { toRefs, ref } from 'vue'
import NodeRenderer from '../utils/nodeRenderer'

export default {
  components: {
    NodeRenderer,
    TlDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '930px',
    },
    title: {
      type: String,
      default: '标题',
    },
    contentHeight: {
      type: String,
      default: '',
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnText: {
      type: String,
      default: '确定',
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Object,
    },
    pagination: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 10,
      }),
    },
    columnDefs: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['selected', 'cancel', 'update:show', 'sizeChange', 'currentChange'],
  setup(props, { emit }) {
    const { show: visible, pagination: pgnation, dataSource: tableData  } = toRefs(props)

    const selection = ref({})
    const vBtn = ref(false)
    const radio = ref('')
    const sbPgnation = ref({pageNum: 1, pageSize: 10})
    const handleDbClick = (row) => {
      emit('selected', row)
      emit('update:show', false)
      vBtn.value = false
    }

    const handleOpen = () => {
      vBtn.value = true
    }

    const handleSelectionChange = (row) => {
      console.log(row)
      handleClose()
    }

    const handleSizeChange = (pageSize) => {
      sbPgnation.value.pageSize = pageSize
      console.log(`pageSize:${pageSize}`)
    }

    const handleCurrentChange = (pageNum) => {
      console.log(`pageNum:${pageNum}`)
      sbPgnation.value.pageNum = pageNum
    }

    const handleSortChange = (sortParam) => {
      console.log(`sortChange:${JSON.stringify(sortParam)}`)
    }

    const handleClose = () => {
      emit('update:show', false)
      vBtn.value = false
    }
    const handleConfirm = () => {
      emit('selected', selection.value)
      emit('update:show', false)
      vBtn.value = false
    }
    const handleCancel = () => {
      emit('update:show', false)
    }

    return {
      handleOpen,
      handleClose,
      handleConfirm,
      handleCancel,
      handleDbClick,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      handleSortChange,
      visible,
      pgnation,
      tableData,
      selection,
      radio,
      vBtn,
      sbPgnation
    }
  },
}
</script>

<style lang="scss">
.base-dialog {
  .el-radio__label {
    display: none !important;
  }
  .el-dialog__header {
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 19px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    background: #fafafa;
    .el-dialog__headerbtn {
      top: 17px;
      .el-dialog__close {
        font-size: 18px !important;
        color: #a4a4a4;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
  .el-dialog__body {
    padding: 15px 20px 24px;
    color: #666666;
    background-color: #ffffff;
    font-size: 12px;
    overflow: hidden;
  }
  .el-dialog__footer {
    padding: 0px 26px 24px 0px;
  }

  .center-middle-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-body {
    height: 100%;
  }
}

.tag {
  margin-bottom: 20px;
}

.pagination-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
}
</style>
