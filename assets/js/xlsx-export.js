// ============================================================
// xlsx-export.js — экспорт пользователей в Excel
// Использует библиотеку SheetJS (xlsx) через CDN
// ============================================================

// ============================================================
// Функция для экспорта пользователей в Excel
// ============================================================
function exportUsersToExcel() {
    // Получаем всех пользователей из БД
    const users = DB.getUsers();
    
    if (users.length === 0) {
        alert('😕 Нет пользователей для экспорта');
        return false;
    }

    try {
        // Проверяем, загружена ли библиотека XLSX
        if (typeof XLSX === 'undefined') {
            // Если библиотека не загружена — загружаем её
            loadXLSXLibrary(function() {
                // После загрузки — повторно вызываем экспорт
                exportUsersToExcel();
            });
            return true;
        }

        // Подготавливаем данные для Excel
        const data = users.map((user, index) => ({
            '№': index + 1,
            'ID': user.id,
            'Имя': user.name,
            'Email': user.email,
            'Дата регистрации': new Date(user.createdAt).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        }));

        // Создаём рабочую книгу
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        // Настраиваем ширину колонок
        ws['!cols'] = [
            { wch: 6 },   // №
            { wch: 22 },  // ID
            { wch: 20 },  // Имя
            { wch: 30 },  // Email
            { wch: 22 }   // Дата регистрации
        ];

        // Добавляем лист в книгу
        XLSX.utils.book_append_sheet(wb, ws, 'Пользователи');

        // Генерируем имя файла с текущей датой
        const now = new Date();
        const dateStr = 
            now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0');
        const fileName = `watchaas_users_${dateStr}.xlsx`;

        // Скачиваем файл
        XLSX.writeFile(wb, fileName);

        console.log(`📊 Экспортировано ${users.length} пользователей в файл: ${fileName}`);
        return true;

    } catch (error) {
        console.error('Ошибка при экспорте в Excel:', error);
        alert('⚠️ Произошла ошибка при экспорте. Попробуйте снова.');
        return false;
    }
}

// ============================================================
// Функция для загрузки библиотеки XLSX с CDN
// ============================================================
function loadXLSXLibrary(callback) {
    // Проверяем, не загружена ли уже
    if (typeof XLSX !== 'undefined') {
        if (callback) callback();
        return;
    }

    console.log('📥 Загрузка библиотеки XLSX...');

    // Создаём скрипт-тег
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
    script.async = true;
    script.onload = function() {
        console.log('✅ Библиотека XLSX загружена');
        if (callback) callback();
    };
    script.onerror = function() {
        console.error('❌ Ошибка загрузки библиотеки XLSX');
        alert('⚠️ Не удалось загрузить библиотеку для создания Excel. Проверьте подключение к интернету.');
    };

    document.head.appendChild(script);
}

// ============================================================
// Альтернативный простой экспорт (без библиотеки)
// Используется как fallback, если XLSX не загрузилась
// ============================================================
function exportUsersToCSV() {
    const users = DB.getUsers();
    
    if (users.length === 0) {
        alert('😕 Нет пользователей для экспорта');
        return false;
    }

    // Заголовки CSV
    let csv = 'ID,Имя,Email,Дата регистрации\n';
    
    // Данные
    users.forEach(user => {
        const date = new Date(user.createdAt).toLocaleString('ru-RU');
        csv += `"${user.id}","${user.name}","${user.email}","${date}"\n`;
    });

    // Скачиваем
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const now = new Date();
    const dateStr = 
        now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0');
    link.download = `watchaas_users_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    console.log(`📊 Экспортировано ${users.length} пользователей в CSV`);
    return true;
}

// ============================================================
// Автоматическая загрузка библиотеки XLSX при загрузке страницы
// ============================================================
// Загружаем библиотеку в фоне, чтобы она была готова к использованию
if (typeof XLSX === 'undefined') {
    loadXLSXLibrary();
}

console.log('📊 xlsx-export.js загружен');
