# 基于headless table 封装适用于韵达移动端使用的表格组件

```
import {BaseTable} from 'zyz-pkg';
```

样式需要考虑结合滚动容器 设置边框

```
.table-container {
border: 1px solid var(--border-color);
}
```

```
<div className="w-[500px] h-[500px] overflow-scroll table-container">
    </div>
```

###demo

```
  <div className="w-[800px] h-[500px] overflow-scroll mx-auto my-10 table-container">
    <BaseTable
        data={defaultData}
        columnPinning={['llll', 'llll33']}
        isTotalRow={isTotalRow}
        columns={[...baseColumn, ...defaultColumns]}
      />
    </div>
```

| key                          | Description    |
| ---------------------------- | -------------- |
| data                         | 表格数据       |
| columns                      | 表格头         |
| meta: {boldDashedLine: true} | 纵向黑虚线的列 |
| columnPinning                | 可sticky的列   |
| isTotalRow                   | 判断合计列     |

## sticky 需要注意

```
 columnPinning={['test']}
```

```
  {
    accessorKey: `test`,
    header: `test`,
    size: 50,
    cell: (info: any) => <span className="w-[50px] inline-block">{info.getValue()}</span>,
  },
```

这个size 和 cell 的width 需要保持一致 不然可能会有间隙

不支持group sticky

判断合计列 示例code

```
const isTotalRow = (row: any) => {
  return row['id'] === 1;
};
```
