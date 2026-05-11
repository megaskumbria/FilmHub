import { defineConfig, devices } from '@playwright/test';

// Главная точка конфигурации Playwright (типы, умолчаний, типовые браузеры).
export default defineConfig({
  // Папка со всеми `*.spec.ts` / тестами.
  testDir: './tests',

  // Запускать тестовые файлы параллельно в разных воркерах (быстрее CI/локально).
  fullyParallel: true,

  // Сколько раз повторять упавший тест (полезно от флаков; 0 — без повторов).
  retries: 1,

  // Как выводить отчёт: HTML-отчёт будет в `playwright-report/` после прогона.
  reporter: 'html',

  // Глобальные настройки для всех проектов, если ниже не переопределены.
  use: {
    // Префикс для `page.goto('/')` → в итоге `http://localhost:5175/`.
    baseURL: 'http://localhost:5175',

    // Трасса (network, snapshots): сохраняется только когда тест упал в конце шага — для разбора.
    trace: 'retain-on-failure',

    // Скриншот вкладки: только при падении теста.
    screenshot: 'only-on-failure',

    // Видео сессии: сохранять только если тест упал.
    video: 'retain-on-failure',
  },

  // Наборы запусков: один и тот же тест можно прогнать в нескольких «профилях» браузера.
  projects: [
    {
      // Имя в отчёте и списках (`npx playwright test --project=...`).
      name: 'Desktop Chrome',
      use: {
        // User-agent, параметры Chromium как у типового Chrome на десктопе.
        ...devices['Desktop Chrome'],
        // Размер окна просмотра (видимая область страницы) в пикселях.
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
    },

    {
      name: 'Mobile',
      use: {
        // Эмуляция iPhone 13: viewport, DPR, touch и т.д.
        ...devices['iPhone 13'],
      },
    },
  ],

  // Перед тестами поднять dev-сервер приложения автоматически.
  webServer: {
    // Команда в корне проекта (здесь — Next на порту из package.json).
    command: 'npm run dev',
    // Ждём, пока этот URL начнёт отвечать, прежде чем стартовать тесты.
    url: 'http://localhost:5175',
    // Если сервер уже запущен (например, вы вручную `npm run dev`) — не убивать и не второй процесс.
    reuseExistingServer: true,
  },
});
