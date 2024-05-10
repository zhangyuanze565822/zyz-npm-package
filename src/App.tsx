import {BaseTable} from './lib';

const defaultData = Array(100)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    llll: `55555555${i}`,
    llll2: `33333${i}`,
    [`key${i}`]: `linsley${i}`,
  }));

const defaultColumns = Array(10)
  .fill(0)
  .map((_, i) => ({
    accessorKey: `key${i}`,
    header: `key${i}`,
    cell: (info: any) => info.getValue(),
  }));

const baseColumn = [
  {
    header: () => (
      <span>
        序<br />号
      </span>
    ),
    accessorKey: `序号`,
    size: 30,
  },
  {
    accessorKey: `llll`,
    header: `llll`,
    size: 50,
    meta: {
      boldDashedLine: true,
    },
    cell: (info: any) => (
      <span className="w-[50px] inline-block break-all text-left">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: `llll33`,
    header: `llll33`,
    size: 50,
    meta: {
      boldDashedLine: true,
    },
    cell: (info: any) => <span className="inline-block w-[50px]">{info.getValue()}</span>,
  },
  {
    accessorKey: `llll3344`,
    header: `llll3344`,
    size: 50,
    cell: (info: any) => <span className="w-[50px] inline-block">{info.getValue()}</span>,
  },
  {
    accessorKey: `aaaa`,
    header: `aaaa`,
    meta: {
      boldDashedLine: true,
    },
    // cell: (info: any) => info.getValue(),
    columns: [
      {
        accessorKey: `bbbb`,
        header: `bbbb`,
        meta: {
          boldDashedLine: true,
        },
        // cell: (info: any) => info.getValue(),
        columns: [
          {
            accessorKey: `dddd`,
            header: `dddd`,
            cell: (info: any) => <span className="w-[50px] inline-block">{info.getValue()}</span>,
          },
          {
            accessorKey: `eeee`,
            header: `eeee`,
            meta: {
              boldDashedLine: true,
            },
            cell: (info: any) => <span className="w-[50px] inline-block">{info.getValue()}</span>,
          },
        ],
      },
      {
        accessorKey: `cccc`,
        header: `cccc`,
        meta: {
          boldDashedLine: true,
        },
        cell: (info: any) => <span className="w-[50px] inline-block">{info.getValue()}</span>,
      },
    ],
  },
  {
    accessorKey: `llll2`,
    header: `llll2`,
    meta: {
      boldDashedLine: true,
    },
    cell: (info: any) => info.getValue(),
  },

  {
    accessorKey: `test1`,
    header: `test1`,
    columns: [
      {
        accessorKey: `dfsdfdsf`,
        header: `fdsfdsfdsfs`,
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: `yyyyyyyyddd`,
        header: `yyyyyyyyddd`,
        columns: [
          {
            accessorKey: `test1112`,
            header: `test1112`,
            cell: (info: any) => info.getValue(),
          },

          {
            accessorKey: `dddtest2`,
            header: `dddtest2`,
            cell: (info: any) => info.getValue(),
          },
        ],
      },

      {
        accessorKey: `yyyyyyyy`,
        header: `yyyyyyyy`,
        columns: [
          {
            accessorKey: `test1111`,
            header: `test1111`,
            cell: (info: any) => info.getValue(),
          },
          {
            accessorKey: `test11122`,
            header: `test11122`,
            cell: (info: any) => info.getValue(),
          },
        ],
      },
    ],
  },
];
const isTotalRow = (row: any) => {
  return row['id'] === 1;
};
function App() {
  return (
    <div className="h-[500px] overflow-scroll w-[500px] m-10">
      <BaseTable
        data={defaultData}
        columnPinning={['序号', 'llll', 'llll33']}
        isTotalRow={isTotalRow}
        columns={[...baseColumn, ...defaultColumns]}
      />
    </div>
  );
}

export default App;
