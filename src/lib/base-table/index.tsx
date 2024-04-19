import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Column,
  Row,
} from '@tanstack/react-table';
import {CSSProperties, useCallback} from 'react';
// import cloneDeep from 'lodash/cloneDeep';

interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  columnPinning?: Array<string>;
  isTotalRow?: (arg: any) => boolean;
}

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  if (isPinned) {
    return {
      left: `${column.getStart('left')}px`,
      position: 'sticky',
      // width: column.getSize(),
      zIndex: 99,
    };
  }
  return {};
};

export default function BaseTable({data, columns, columnPinning = [], isTotalRow}: TableProps) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning: {
        left: columnPinning,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  // const isTotalRow = (row: any) => {
  //   return row['id'] === 1;
  // };

  const getTotalRowStyles = useCallback(
    (row: Row<any>): CSSProperties => {
      if (isTotalRow && isTotalRow(row.original)) {
        return {
          color: `red`,
        };
      }
      return {};
    },
    [isTotalRow],
  );

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{...getCommonPinningStyles(header.column)}}
                className={`${header.isPlaceholder ? 'hiddenLine' : ''}${(header.column.columnDef.meta as any)?.boldDashedLine ? ' boldDashedLine' : ''}`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{...getCommonPinningStyles(cell.column), ...getTotalRowStyles(row)}}
                className={`${(cell.column.columnDef.meta as any)?.boldDashedLine ? 'boldDashedLine' : ''}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
