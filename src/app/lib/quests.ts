import { SchoolType } from '../curses_data';

export interface QuestRequirement {
  type: 'cast_any' | 'cast_spell' | 'cast_full' | 'collect_school' | 'fuse_once' | 'collect_total';
  spellIds?: string[];
  school?: SchoolType;
  count?: number;
}

export interface QuestReward {
  type: 'mp' | 'title';
  value: number | string;
}

export interface Quest {
  id: string;
  school: SchoolType;
  order: number;
  title: string;
  description: string;
  requirement: QuestRequirement;
  reward: QuestReward;
  prerequisite?: string;
}

export const QUESTS: Quest[] = [
  // ━━━ 防禦學派 (defense) ━━━
  {
    id: 'defense_1',
    school: 'defense',
    order: 1,
    title: '防禦入門',
    description: '施放任何一個防禦學派的咒語',
    requirement: { type: 'cast_any', school: 'defense' },
    reward: { type: 'mp', value: 2 },
  },
  {
    id: 'defense_2',
    school: 'defense',
    order: 2,
    title: '防禦精通',
    description: '全力詠唱「情緒勒索破盾術」',
    requirement: { type: 'cast_full', spellIds: ['emotional_blackmail_breaker'] },
    reward: { type: 'mp', value: 3 },
    prerequisite: 'defense_1',
  },
  {
    id: 'defense_3',
    school: 'defense',
    order: 3,
    title: '防禦收藏',
    description: '收集 3 張防禦學派的卡牌',
    requirement: { type: 'collect_school', school: 'defense', count: 3 },
    reward: { type: 'mp', value: 5 },
    prerequisite: 'defense_2',
  },
  {
    id: 'defense_4',
    school: 'defense',
    order: 4,
    title: '防禦昇華',
    description: '完成一次包含防禦學派咒語的融合',
    requirement: { type: 'fuse_once', school: 'defense' },
    reward: { type: 'title', value: '防禦大師' },
    prerequisite: 'defense_3',
  },

  // ━━━ 攻擊學派 (attack) ━━━
  {
    id: 'attack_1',
    school: 'attack',
    order: 1,
    title: '攻擊入門',
    description: '施放任何一個攻擊學派的咒語',
    requirement: { type: 'cast_any', school: 'attack' },
    reward: { type: 'mp', value: 2 },
  },
  {
    id: 'attack_2',
    school: 'attack',
    order: 2,
    title: '攻擊精通',
    description: '全力詠唱「搶功小人殲滅術」',
    requirement: { type: 'cast_full', spellIds: ['credit_thief_slayer'] },
    reward: { type: 'mp', value: 3 },
    prerequisite: 'attack_1',
  },
  {
    id: 'attack_3',
    school: 'attack',
    order: 3,
    title: '攻擊收藏',
    description: '收集 3 張攻擊學派的卡牌',
    requirement: { type: 'collect_school', school: 'attack', count: 3 },
    reward: { type: 'mp', value: 5 },
    prerequisite: 'attack_2',
  },
  {
    id: 'attack_4',
    school: 'attack',
    order: 4,
    title: '攻擊昇華',
    description: '完成一次包含攻擊學派咒語的融合',
    requirement: { type: 'fuse_once', school: 'attack' },
    reward: { type: 'title', value: '攻擊大師' },
    prerequisite: 'attack_3',
  },

  // ━━━ 治癒學派 (healing) ━━━
  {
    id: 'healing_1',
    school: 'healing',
    order: 1,
    title: '治癒入門',
    description: '施放任何一個治癒學派的咒語',
    requirement: { type: 'cast_any', school: 'healing' },
    reward: { type: 'mp', value: 2 },
  },
  {
    id: 'healing_2',
    school: 'healing',
    order: 2,
    title: '治癒精通',
    description: '全力詠唱「尷尬急救術」',
    requirement: { type: 'cast_full', spellIds: ['awkward_heal'] },
    reward: { type: 'mp', value: 3 },
    prerequisite: 'healing_1',
  },
  {
    id: 'healing_3',
    school: 'healing',
    order: 3,
    title: '治癒收藏',
    description: '收集 3 張治癒學派的卡牌',
    requirement: { type: 'collect_school', school: 'healing', count: 3 },
    reward: { type: 'mp', value: 5 },
    prerequisite: 'healing_2',
  },
  {
    id: 'healing_4',
    school: 'healing',
    order: 4,
    title: '治癒昇華',
    description: '完成一次包含治癒學派咒語的融合',
    requirement: { type: 'fuse_once', school: 'healing' },
    reward: { type: 'title', value: '治癒大師' },
    prerequisite: 'healing_3',
  },

  // ━━━ 幻術學派 (illusion) ━━━
  {
    id: 'illusion_1',
    school: 'illusion',
    order: 1,
    title: '幻術入門',
    description: '施放任何一個幻術學派的咒語',
    requirement: { type: 'cast_any', school: 'illusion' },
    reward: { type: 'mp', value: 2 },
  },
  {
    id: 'illusion_2',
    school: 'illusion',
    order: 2,
    title: '幻術精通',
    description: '全力詠唱「遲到煙幕」',
    requirement: { type: 'cast_full', spellIds: ['late_smoke_screen'] },
    reward: { type: 'mp', value: 3 },
    prerequisite: 'illusion_1',
  },
  {
    id: 'illusion_3',
    school: 'illusion',
    order: 3,
    title: '幻術收藏',
    description: '收集 3 張幻術學派的卡牌',
    requirement: { type: 'collect_school', school: 'illusion', count: 3 },
    reward: { type: 'mp', value: 5 },
    prerequisite: 'illusion_2',
  },
  {
    id: 'illusion_4',
    school: 'illusion',
    order: 4,
    title: '幻術昇華',
    description: '完成一次包含幻術學派咒語的融合',
    requirement: { type: 'fuse_once', school: 'illusion' },
    reward: { type: 'title', value: '幻術大師' },
    prerequisite: 'illusion_3',
  },

  // ━━━ 契約學派 (contract) ━━━
  {
    id: 'contract_1',
    school: 'contract',
    order: 1,
    title: '契約入門',
    description: '施放任何一個契約學派的咒語',
    requirement: { type: 'cast_any', school: 'contract' },
    reward: { type: 'mp', value: 2 },
  },
  {
    id: 'contract_2',
    school: 'contract',
    order: 2,
    title: '契約精通',
    description: '全力詠唱「合夥核彈條款」',
    requirement: { type: 'cast_full', spellIds: ['partnership_nuclear_pact'] },
    reward: { type: 'mp', value: 3 },
    prerequisite: 'contract_1',
  },
  {
    id: 'contract_3',
    school: 'contract',
    order: 3,
    title: '契約收藏',
    description: '收集 3 張契約學派的卡牌',
    requirement: { type: 'collect_school', school: 'contract', count: 3 },
    reward: { type: 'mp', value: 5 },
    prerequisite: 'contract_2',
  },
  {
    id: 'contract_4',
    school: 'contract',
    order: 4,
    title: '契約昇華',
    description: '完成一次包含契約學派咒語的融合',
    requirement: { type: 'fuse_once', school: 'contract' },
    reward: { type: 'title', value: '契約大師' },
    prerequisite: 'contract_3',
  },

  // ━━━ 洞察學派 (insight) ━━━
  {
    id: 'insight_1',
    school: 'insight',
    order: 1,
    title: '洞察入門',
    description: '施放任何一個洞察學派的咒語',
    requirement: { type: 'cast_any', school: 'insight' },
    reward: { type: 'mp', value: 2 },
  },
  {
    id: 'insight_2',
    school: 'insight',
    order: 2,
    title: '洞察精通',
    description: '全力詠唱「比價偵查術」',
    requirement: { type: 'cast_full', spellIds: ['price_scout'] },
    reward: { type: 'mp', value: 3 },
    prerequisite: 'insight_1',
  },
  {
    id: 'insight_3',
    school: 'insight',
    order: 3,
    title: '洞察收藏',
    description: '收集 3 張洞察學派的卡牌',
    requirement: { type: 'collect_school', school: 'insight', count: 3 },
    reward: { type: 'mp', value: 5 },
    prerequisite: 'insight_2',
  },
  {
    id: 'insight_4',
    school: 'insight',
    order: 4,
    title: '洞察昇華',
    description: '完成一次包含洞察學派咒語的融合',
    requirement: { type: 'fuse_once', school: 'insight' },
    reward: { type: 'title', value: '洞察大師' },
    prerequisite: 'insight_3',
  },
];

// Helper: get quests for a specific school
export function getSchoolQuests(school: SchoolType): Quest[] {
  return QUESTS.filter(q => q.school === school).sort((a, b) => a.order - b.order);
}
