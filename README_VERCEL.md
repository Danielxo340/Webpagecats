# Розгортання на Vercel

## Підготовка завершена ✓

Ваш проект готовий для Vercel. Створено:
- `vercel.json` - конфігурація для Vercel
- `api/index.ts` - API endpoint для serverless функцій
- База даних PostgreSQL налаштована

## Кроки для розгортання:

### 1. Завантаження до GitHub
```bash
git init
git add .
git commit -m "Cat adoption website ready for Vercel"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Підключення до Vercel
1. Зайдіть на vercel.com
2. Підключіть ваш GitHub репозиторій
3. Vercel автоматично виявить React проект

### 3. Налаштування змінних середовища
В налаштуваннях Vercel додайте:
- `DATABASE_URL` - URL вашої PostgreSQL бази даних

### 4. Розгортання
Vercel автоматично зібере та розгорне проект після кожного push до GitHub.

## Що працюватиме:
- Frontend React додаток
- API для котів та заявок на усиновлення
- База даних PostgreSQL
- Responsive дизайн

Ваш сайт буде доступний за адресою типу: `https://your-project-name.vercel.app`