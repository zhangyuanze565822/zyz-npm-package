# 基于headless table 封装适用于移动端使用的表格组件

```
import {BaseTable} from 'zyz-pkg';
```

```
<div className="w-[500px] h-[500px] overflow-scroll">
    </div>
```

### demo

```
  <div className="w-[800px] h-[500px] overflow-scroll">
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

显示序号

```
  {
    header: () => (
      <span>
        序<br />号
      </span>
    ),
    accessorKey: `序号`,
    size: 20,
  },
```
