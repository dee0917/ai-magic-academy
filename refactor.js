const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace \${...} with \x01\${...}\x02 inside template literals.
code = code.replace(/\$\{inputs\.[^}]+\}/g, '\x01$&\x02');

// Cleanup double replacements just in case
code = code.replace(/\x01\x01/g, '\x01').replace(/\x02\x02/g, '\x02');

// Update boss_line to include role
code = code.replace(
  `{ id: "boss_msg", label: "老闆傳了什麼？", placeholder: "例：明早開會的簡報你今晚趕一下給我" },`,
  `{ id: "my_role", label: "你的職位", placeholder: "例：基層工程師 / 視覺設計師" },
      { id: "boss_role", label: "對方職級/你與他的關係", placeholder: "例：直屬主管 / 公司創辦人" },
      { id: "boss_msg", label: "他傳了什麼？", placeholder: "例：明早開會的簡報你今晚趕一下給我" },`
);

code = code.replace(
  `你是一位精通台灣職場生存學的高階秘書。`,
  `你是一位具備邊界感的高情商職場專業人士（職位：\x01\${inputs.my_role || '基層員工'}\x02）。
對方是我的：「\x01\${inputs.boss_role || '老闆'}\x02」。`
);

fs.writeFileSync('src/app/page.tsx', code);
console.log('Done replacement');
