# Watchaas PWA

Статическая версия учебного магазина часов для GitHub Pages.

## Что есть

- `index.html` без PHP
- каталог часов на JavaScript
- фильтр по бренду, механизму и цене
- отзывы с фильтром по дате
- ToDoList через `localStorage`
- `manifest.json`
- `sw.js`
- offline-страница

## Запуск локально

Откройте папку через простой сервер:

```bash
python -m http.server 4173
```

Адрес:

```text
http://127.0.0.1:4173/
```

## GitHub Pages

1. Создайте репозиторий на GitHub.
2. Загрузите содержимое этой папки.
3. Включите `Settings -> Pages -> Deploy from a branch`.
4. Выберите ветку `main` и папку `/root`.
5. Откройте ссылку GitHub Pages и установите PWA на телефон.
