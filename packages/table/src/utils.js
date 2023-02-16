import { clone } from 'ramda'

export const columnsTransformer = (columnsFromDB, columnsFromPageDefinition) => {
  const dbTitle = columnsFromDB.map((i) => i.field)

  const newColumnDefs = columnsFromPageDefinition.filter((c) => !dbTitle.includes(c.field))

  const columns = [
    ...columnsFromDB.map((item) => {
      const matchedColumn = clone(columnsFromPageDefinition.find((c) => c.field === item.field))
      if (matchedColumn) {
        matchedColumn.minWidth = item.minWidth
        matchedColumn.checked = item.checked
        matchedColumn.visible = item.checked
        matchedColumn.showOverflow = item.showOverflow
      }

      return matchedColumn
    }),
    ...newColumnDefs,
  ].filter((i) => !!i)

  return columns
}


export const clearNoInteger = (value) => {
  if (isNaN(value)) return value;

  value = value.replace(/[^\d]/g, ''); // 清除"数字"以外的字符

  return value;
}
