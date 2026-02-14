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
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '데이터를 행과 열로 표시하는 테이블 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const noControls = (story: string) => ({
  parameters: {
    controls: { disable: true },
    docs: { description: { story } },
  },
});

const teamStandings = [
  { rank: 1, team: 'LG', games: 144, wins: 85, losses: 56, draws: 3, winRate: '.603', gamesBehind: '-' },
  { rank: 2, team: '한화', games: 144, wins: 83, losses: 57, draws: 4, winRate: '.593', gamesBehind: '1.5' },
  { rank: 3, team: 'SSG', games: 144, wins: 75, losses: 65, draws: 4, winRate: '.536', gamesBehind: '9.5' },
  { rank: 4, team: '삼성', games: 144, wins: 74, losses: 68, draws: 2, winRate: '.521', gamesBehind: '11.5' },
  { rank: 5, team: 'NC', games: 144, wins: 71, losses: 67, draws: 6, winRate: '.514', gamesBehind: '12.5' },
  { rank: 6, team: 'KT', games: 144, wins: 71, losses: 68, draws: 5, winRate: '.511', gamesBehind: '13' },
  { rank: 7, team: '롯데', games: 144, wins: 66, losses: 72, draws: 6, winRate: '.478', gamesBehind: '17.5' },
  { rank: 8, team: 'KIA', games: 144, wins: 65, losses: 75, draws: 4, winRate: '.464', gamesBehind: '19.5' },
  { rank: 9, team: '두산', games: 144, wins: 61, losses: 77, draws: 6, winRate: '.442', gamesBehind: '22.5' },
  { rank: 10, team: '키움', games: 144, wins: 47, losses: 93, draws: 4, winRate: '.336', gamesBehind: '37.5' },
];

export const Default: Story = {
  ...noControls(
    'TableHeader, TableBody, TableFooter, TableCaption을 모두 활용한 KBO 팀 순위표입니다.',
  ),
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
          <TableRow
            key={team.team}
            data-state={team.team === '롯데' ? 'selected' : undefined}
          >
            <TableCell>{team.rank}</TableCell>
            <TableCell className="font-medium">{team.team}</TableCell>
            <TableCell className="text-right">{team.games}</TableCell>
            <TableCell className="text-right">{team.wins}</TableCell>
            <TableCell className="text-right">{team.losses}</TableCell>
            <TableCell className="text-right">{team.draws}</TableCell>
            <TableCell className="text-right">{team.winRate}</TableCell>
            <TableCell className="text-right">
              {team.gamesBehind}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

const plans = [
  { service: 'Claude', plan: 'Max (x20)', price: '$200' },
  { service: 'ChatGPT', plan: 'Plus', price: '$20' },
  { service: 'Google AI', plan: 'Pro', price: '$19.99' },
];

export const WithFooter: Story = {
  ...noControls(
    'TableFooter를 활용해 합계를 표시하는 구독 요금 테이블입니다.',
  ),
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
            <TableCell className="font-medium">
              {item.service}
            </TableCell>
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
