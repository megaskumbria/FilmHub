🚀 Что нужно добавить (самое важное)

1. Введи “Visual Quality Loop” (это game changer)
   Каждый UI-фикс должен идти так:

2. Open page in browser (Playwright)
3. Take screenshot
4. Analyze UI like a senior frontend engineer
5. Identify visual issues:
   - spacing
   - alignment
   - typography hierarchy
   - color contrast
   - consistency
6. Apply small incremental fix
7. Reload page
8. Take new screenshot
9. Compare before/after
10. Repeat until clean

11. Добавь “Visual Review Prompt” (самый сильный хак)

Когда хочешь, чтобы агент улучшал UI, пиши так:

Open the app and act as a senior product designer from Linear.

Task:

- Evaluate UI visually using Playwright screenshot
- Identify inconsistencies in spacing, typography, alignment
- Compare with Linear / Vercel design level
- After changes: re-screenshot and verify improvement

В твоём распоряжении есть MCP клиент, ты можешь запустить его на 5175 порту, чтобы смотреть визуал. Есть framer-motion, есть огромные библиотеки иконок по типу tabler / material - не стесняйся это использовать чтобы сделать детализированные и красивые стопки
