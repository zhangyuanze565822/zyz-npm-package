import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  Column,
  Row,
} from '@tanstack/react-table';
import {CSSProperties, useCallback, useMemo} from 'react';
import './style.css';
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
      zIndex: 999,
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
  const headerGroups = table.getHeaderGroups();
  const rowStack: any = useMemo(() => {
    const stackObj: any = {};
    headerGroups.forEach((headerGroup) => {
      headerGroup.headers.forEach((header) => {
        const headerId = header.column.id;
        if (!stackObj[headerId]) {
          stackObj[headerId] = {rowSpan: 1, hasMerged: false};
        } else {
          const headerObj = stackObj[headerId];
          stackObj[headerId] = {
            ...headerObj,
            rowSpan: headerObj.rowSpan + 1,
          };
        }
      });
    });
    return stackObj;
  }, [headerGroups]);

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (rowStack[header.column.id].hasMerged) {
                    return null;
                  }
                  rowStack[header.column.id].hasMerged = true;
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan || 1}
                      rowSpan={rowStack[header.column.id].rowSpan || 1}
                      style={{...getCommonPinningStyles(header.column)}}
                      className={`${(header.column.columnDef.meta as any)?.boldDashedLine ? 'boldDashedLine' : ''}${header.column.id === '序号' ? ' line' : ''}`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    style={{...getCommonPinningStyles(cell.column), ...getTotalRowStyles(row)}}
                    className={`${(cell.column.columnDef.meta as any)?.boldDashedLine ? 'boldDashedLine' : ''}`}
                  >
                    {cell.column.id === '序号' ? (
                      <span className="inline-block" style={{width: cell.column.getSize() + 'px'}}>
                        {index + 1}
                      </span>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
