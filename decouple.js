const fs = require('fs');

let pageCode = fs.readFileSync('src/app/page.tsx', 'utf8');

// The CURSES array starts at 'const CURSES = [' and ends at 'export default function MagicAcademyMVP()'
const cursesStart = pageCode.indexOf('const CURSES = [');
const cursesEnd = pageCode.indexOf('export default function MagicAcademyMVP()');

// Extract the CURSES array string
let cursesCode = pageCode.substring(cursesStart, cursesEnd);

// Replace \x01 and \x02 with [[ and ]] globally if they exist (or add them if some are missing)
cursesCode = cursesCode.replace(/\x01/g, '[[').replace(/\x02/g, ']]');

// Add "tab" and "isPro" and "outputFormat" properties
let tabMap = {
  boss_line: '向上管理',
  resignation_pr: '向上管理',
  salary_negotiation: '向上管理',
  delay_apology: '向上管理',
  kpi_inflation: '向上管理',
  
  reject_people_pleaser: '平級協作',
  dead_teammate: '平級協作',
  credit_stealer: '平級協作',
  meeting_summary: '平級協作',
  cross_dept_resource: '平級協作',
  creative_idea: '平級協作',
  
  crisis_pr: '外部公關',
  decline_offer: '外部公關',
  vendor_negotiation: '外部公關',
  customer_complaint: '外部公關',
  freelance_quote: '外部公關',
};

let outputMap = {
  boss_line: 'LINE 短訊',
  crisis_pr: '正式 Email',
  reject_people_pleaser: 'LINE/Slack',
  wedding_bomb: 'LINE 婉拒',
  kpi_inflation: '500字報告',
  landlord_battle: 'LINE 嚴正通知',
  shopee_copywriting: '500字拍賣文',
  travel_guide: 'Markdown 行程',
  resignation_pr: '正式 Email',
  creative_idea: '條列式點子',
  vent_purifier: 'IG 限動文案'
};

cursesCode = cursesCode.replace(/id: "([\w_]+)",/g, (match, p1) => {
  let tabName = tabMap[p1] || '生活瑣事';
  // randomly make some high-risk stuff pro
  let isPro = (tabName === '向上管理' || tabName === '外部公關' || p1 === 'crisis_pr') ? 'true' : 'false';
  let format = outputMap[p1] || '靈活長度文本';
  return `id: "${p1}", tab: "${tabName}", isPro: ${isPro}, outputFormat: "${format}",`;
});

// Update the export of CURSES
cursesCode = `import { 
  Sparkles, Flame, Droplets, Wind, Copy, ExternalLink, ChevronDown, X, Search, Check,
  ShieldAlert, Hand, Mail, TrendingUp, Gavel, ShoppingBag, Map, LogOut, Lightbulb, Smile,
  AlertTriangle, Ban, BarChart, Home, Hammer, Navigation, FileText, Zap,
  Ghost, GraduationCap, Coins, Handshake, Trash2, HeartOff, PenTool, Send, Calendar, Megaphone, 
  Beer, ShieldCheck, UserPlus, Wallet, HelpCircle, ClipboardList, Clock, Receipt, Heart, Music,
  Dumbbell, Star, CircleDollarSign, VolumeX, Headset, ShieldX, Swords, Gift, Users,
  Brain, Bot, MessageSquare, Lock
} from "lucide-react";\nimport React from "react";\n\n` + cursesCode.replace('const CURSES =', 'export const CURSES =');

fs.writeFileSync('src/app/curses_data.tsx', cursesCode);

// Remove CURSES from page.tsx and add import
pageCode = pageCode.substring(0, cursesStart) + pageCode.substring(cursesEnd);
pageCode = pageCode.replace(
  `import { useState } from "react";`,
  `import { useState } from "react";\nimport { CURSES } from "./curses_data";`
);

fs.writeFileSync('src/app/page.tsx', pageCode);

// Optional: fix the dynamic highlighting parsing later
console.log('Decoupled CURSES successfully');
