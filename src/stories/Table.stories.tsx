import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'lib/components/table';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'UI/Table',
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '데이터를 행과 열로 표시하는 테이블 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

// ─── Default ─────────────────────────────────────────────

type DefaultArgs = {
  // Table
  _tableChildren: string;
  _tableClassName: string;
  // TableHeader
  _headerChildren: string;
  _headerClassName: string;
  // TableBody
  _bodyChildren: string;
  _bodyClassName: string;
  // TableFooter
  _footerChildren: string;
  _footerClassName: string;
  // TableRow
  _rowChildren: string;
  _rowClassName: string;
  _rowDataState: string;
  // TableHead
  _headChildren: string;
  _headClassName: string;
  _headColSpan: string;
  // TableCell
  _cellChildren: string;
  _cellClassName: string;
  _cellColSpan: string;
  // TableCaption
  _captionChildren: string;
  _captionClassName: string;
};

const teamStandings = [
  {
    rank: 1,
    team: 'LG',
    games: 144,
    wins: 85,
    losses: 56,
    draws: 3,
    winRate: '.603',
    gamesBehind: '-',
  },
  {
    rank: 2,
    team: '한화',
    games: 144,
    wins: 83,
    losses: 57,
    draws: 4,
    winRate: '.593',
    gamesBehind: '1.5',
  },
  {
    rank: 3,
    team: 'SSG',
    games: 144,
    wins: 75,
    losses: 65,
    draws: 4,
    winRate: '.536',
    gamesBehind: '9.5',
  },
  {
    rank: 4,
    team: '삼성',
    games: 144,
    wins: 74,
    losses: 68,
    draws: 2,
    winRate: '.521',
    gamesBehind: '11.5',
  },
  {
    rank: 5,
    team: 'NC',
    games: 144,
    wins: 71,
    losses: 67,
    draws: 6,
    winRate: '.514',
    gamesBehind: '12.5',
  },
  {
    rank: 6,
    team: 'KT',
    games: 144,
    wins: 71,
    losses: 68,
    draws: 5,
    winRate: '.511',
    gamesBehind: '13',
  },
  {
    rank: 7,
    team: '롯데',
    games: 144,
    wins: 66,
    losses: 72,
    draws: 6,
    winRate: '.478',
    gamesBehind: '17.5',
  },
  {
    rank: 8,
    team: 'KIA',
    games: 144,
    wins: 65,
    losses: 75,
    draws: 4,
    winRate: '.464',
    gamesBehind: '19.5',
  },
  {
    rank: 9,
    team: '두산',
    games: 144,
    wins: 61,
    losses: 77,
    draws: 6,
    winRate: '.442',
    gamesBehind: '22.5',
  },
  {
    rank: 10,
    team: '키움',
    games: 144,
    wins: 47,
    losses: 93,
    draws: 4,
    winRate: '.336',
    gamesBehind: '37.5',
  },
];

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    // ─── Table ────────────────────────────────
    _tableChildren: {
      name: 'children',
      control: false,
      description: 'TableHeader, TableBody, TableFooter, TableCaption 조합',
      table: {
        category: 'Table',
        type: { summary: 'ReactNode' },
      },
    },
    _tableClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스 (자동 가로 스크롤 컨테이너 래핑)',
      table: {
        category: 'Table',
        type: { summary: 'string' },
      },
    },
    // ─── TableHeader ─────────────────────────
    _headerChildren: {
      name: 'children',
      control: false,
      description: 'TableRow를 children으로 구성',
      table: {
        category: 'TableHeader',
        type: { summary: 'ReactNode' },
      },
    },
    _headerClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableHeader',
        type: { summary: 'string' },
      },
    },
    // ─── TableBody ───────────────────────────
    _bodyChildren: {
      name: 'children',
      control: false,
      description: 'TableRow를 children으로 구성',
      table: {
        category: 'TableBody',
        type: { summary: 'ReactNode' },
      },
    },
    _bodyClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableBody',
        type: { summary: 'string' },
      },
    },
    // ─── TableFooter ─────────────────────────
    _footerChildren: {
      name: 'children',
      control: false,
      description: 'TableRow를 children으로 구성 (muted 배경 자동 적용)',
      table: {
        category: 'TableFooter',
        type: { summary: 'ReactNode' },
      },
    },
    _footerClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableFooter',
        type: { summary: 'string' },
      },
    },
    // ─── TableRow ────────────────────────────
    _rowChildren: {
      name: 'children',
      control: false,
      description: 'TableHead 또는 TableCell을 children으로 구성',
      table: {
        category: 'TableRow',
        type: { summary: 'ReactNode' },
      },
    },
    _rowClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableRow',
        type: { summary: 'string' },
      },
    },
    _rowDataState: {
      name: 'data-state',
      control: false,
      description: '"selected" 지정 시 muted 배경으로 선택 상태를 표시합니다',
      table: {
        category: 'TableRow',
        type: { summary: '"selected"' },
      },
    },
    // ─── TableHead ───────────────────────────
    _headChildren: {
      name: 'children',
      control: false,
      description: '헤더 셀 내용 (checkbox 자식 감지 시 padding 자동 조정)',
      table: {
        category: 'TableHead',
        type: { summary: 'ReactNode' },
      },
    },
    _headClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableHead',
        type: { summary: 'string' },
      },
    },
    _headColSpan: {
      name: 'colSpan',
      control: false,
      description: '셀 병합 수',
      table: {
        category: 'TableHead',
        type: { summary: 'number' },
      },
    },
    // ─── TableCell ───────────────────────────
    _cellChildren: {
      name: 'children',
      control: false,
      description: '데이터 셀 내용 (checkbox 자식 감지 시 padding 자동 조정)',
      table: {
        category: 'TableCell',
        type: { summary: 'ReactNode' },
      },
    },
    _cellClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableCell',
        type: { summary: 'string' },
      },
    },
    _cellColSpan: {
      name: 'colSpan',
      control: false,
      description: '셀 병합 수',
      table: {
        category: 'TableCell',
        type: { summary: 'number' },
      },
    },
    // ─── TableCaption ────────────────────────
    _captionChildren: {
      name: 'children',
      control: false,
      description: '테이블 하단에 표시되는 설명 텍스트',
      table: {
        category: 'TableCaption',
        type: { summary: 'ReactNode' },
      },
    },
    _captionClassName: {
      name: 'className',
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'TableCaption',
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'TableHeader, TableBody, TableCaption을 모두 활용한 KBO 팀 순위표입니다.',
      },
      source: {
        code: `<Table>
  <TableCaption>2025 KBO 리그 정규시즌 최종 순위</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>#</TableHead>
      <TableHead>팀명</TableHead>
      <TableHead>승</TableHead>
      <TableHead>패</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>LG</TableCell>
      <TableCell>85</TableCell>
      <TableCell>56</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    },
  },
  render: () => (
    <Table>
      <TableCaption>2025 KBO 리그 정규시즌 최종 순위</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>팀명</TableHead>
          <TableHead className="text-right">경기</TableHead>
          <TableHead className="text-right">승</TableHead>
          <TableHead className="text-right">패</TableHead>
          <TableHead className="text-right">무</TableHead>
          <TableHead className="text-right">승률</TableHead>
          <TableHead className="text-right">게임차</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamStandings.map((team) => (
          <TableRow key={team.team}>
            <TableCell>{team.rank}</TableCell>
            <TableCell className="font-medium">{team.team}</TableCell>
            <TableCell className="text-right">{team.games}</TableCell>
            <TableCell className="text-right">{team.wins}</TableCell>
            <TableCell className="text-right">{team.losses}</TableCell>
            <TableCell className="text-right">{team.draws}</TableCell>
            <TableCell className="text-right">{team.winRate}</TableCell>
            <TableCell className="text-right">{team.gamesBehind}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// ─── WithFooter ──────────────────────────────────────────

const plans = [
  { service: 'Claude', plan: 'Max (x20)', price: '$200' },
  { service: 'ChatGPT', plan: 'Plus', price: '$20' },
  { service: 'Google AI', plan: 'Pro', price: '$19.99' },
];

export const WithFooter: StoryObj = {
  ...noControls('TableFooter를 활용해 합계를 표시하는 구독 요금 테이블입니다.'),
  render: () => (
    <Table>
      <TableCaption>2025년 2월 기준 월간 구독 요금</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>서비스</TableHead>
          <TableHead>요금제</TableHead>
          <TableHead className="text-right">월 요금</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((item) => (
          <TableRow key={item.service}>
            <TableCell className="font-medium">{item.service}</TableCell>
            <TableCell>{item.plan}</TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>합계</TableCell>
          <TableCell className="text-right">$239.99</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// ─── SelectedRows ────────────────────────────────────────

export const SelectedRows: StoryObj = {
  ...noControls(
    'TableRow에 data-state="selected"를 지정하면 muted 배경으로 선택 상태를 표시합니다.',
  ),
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>팀명</TableHead>
          <TableHead className="text-right">승률</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teamStandings.slice(0, 5).map((team) => (
          <TableRow
            key={team.team}
            data-state={
              team.team === 'LG' || team.team === 'SSG' ? 'selected' : undefined
            }
          >
            <TableCell>{team.rank}</TableCell>
            <TableCell className="font-medium">{team.team}</TableCell>
            <TableCell className="text-right">{team.winRate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// ─── ColSpan ─────────────────────────────────────────────

export const ColSpan: StoryObj = {
  ...noControls(
    'TableCell의 colSpan으로 셀을 병합합니다. 요약 행과 빈 상태에 활용됩니다.',
  ),
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>프레임워크</TableHead>
          <TableHead>렌더링</TableHead>
          <TableHead className="text-right">GitHub Stars</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Next.js</TableCell>
          <TableCell>SSR / SSG</TableCell>
          <TableCell className="text-right">139k</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>React Router</TableCell>
          <TableCell>SSR / SPA</TableCell>
          <TableCell className="text-right">56k</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>합계</TableCell>
          <TableCell className="text-right">195k</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// ─── HorizontalScroll ────────────────────────────────────

const frameworks = [
  {
    name: 'Next.js',
    lang: 'TypeScript',
    rendering: 'SSR / SSG',
    stars: '139k',
    license: 'MIT',
    firstRelease: '2016',
    latestVersion: 'v16.2',
  },
  {
    name: 'React Router',
    lang: 'TypeScript',
    rendering: 'SSR / SPA',
    stars: '56k',
    license: 'MIT',
    firstRelease: '2014',
    latestVersion: 'v7.13',
  },
  {
    name: 'Astro',
    lang: 'TypeScript',
    rendering: 'SSG / Island',
    stars: '58k',
    license: 'MIT',
    firstRelease: '2022',
    latestVersion: 'v6.1',
  },
];

export const HorizontalScroll: StoryObj = {
  ...noControls(
    'Table은 자동으로 가로 스크롤 컨테이너를 래핑합니다. 좁은 영역에서 컬럼이 많을 때 동작을 확인합니다.',
  ),
  render: () => (
    <div className="w-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>언어</TableHead>
            <TableHead>렌더링</TableHead>
            <TableHead>Stars</TableHead>
            <TableHead>라이선스</TableHead>
            <TableHead>최초 릴리즈</TableHead>
            <TableHead>최신 버전</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frameworks.map((fw) => (
            <TableRow key={fw.name}>
              <TableCell className="font-medium">{fw.name}</TableCell>
              <TableCell>{fw.lang}</TableCell>
              <TableCell>{fw.rendering}</TableCell>
              <TableCell>{fw.stars}</TableCell>
              <TableCell>{fw.license}</TableCell>
              <TableCell>{fw.firstRelease}</TableCell>
              <TableCell>{fw.latestVersion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

// ─── CustomCellRendering ─────────────────────────────────

const statusStyle: Record<string, string> = {
  결제완료: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  대기중: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  실패: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const invoices = [
  { id: 'INV-001', status: '결제완료', method: '카드', amount: 250000 },
  { id: 'INV-002', status: '대기중', method: '계좌이체', amount: 150000 },
  { id: 'INV-003', status: '실패', method: '카드', amount: 80000 },
  { id: 'INV-004', status: '결제완료', method: '계좌이체', amount: 520000 },
  { id: 'INV-005', status: '대기중', method: '카드', amount: 190000 },
];

export const CustomCellRendering: StoryObj = {
  ...noControls(
    'Tailwind 클래스로 Badge 스타일 상태 표시 및 금액 포맷 등 셀을 커스터마이징합니다.',
  ),
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>결제수단</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[inv.status]}`}
              >
                {inv.status}
              </span>
            </TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              ₩{inv.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
