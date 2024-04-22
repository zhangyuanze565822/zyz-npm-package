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
    size: 20,
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
    accessorKey: `xxxxx`,
    header: `xxxxx`,
    columns: [
      {
        accessorKey: `ffff`,
        header: `fffff`,
        cell: (info: any) => info.getValue(),
      },
      {
        accessorKey: `ggggg`,
        header: `ggggg`,
        cell: (info: any) => info.getValue(),
      },
    ],
  },
];
const isTotalRow = (row: any) => {
  return row['id'] === 1;
};
function App() {
  return (
    <div className="m-10">
      <div className="w-[300px] h-[500px] overflow-scroll table-container">
        <BaseTable
          data={defaultData}
          columnPinning={['序号', 'llll', 'llll33']}
          isTotalRow={isTotalRow}
          columns={[...baseColumn, ...defaultColumns]}
        />
      </div>
    </div>
  );
}

export default App;
