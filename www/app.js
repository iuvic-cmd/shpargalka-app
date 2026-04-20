const cheats = [
    {
        title: '🟢 Git основные команды',
        tags: 'git коммит пуш',
        content: `git init
git add .
git commit -m "текст"
git push origin main
git pull`,
        copy: 'git init\ngit add .\ngit commit -m "текст"\ngit push origin main\ngit pull'
    },
    {
        title: '🐍 Python в Termux',
        tags: 'python термукс установка',
        content: `pkg install python
python script.py
pip install requests`,
        copy: 'pkg install python\npython script.py\npip install requests'
    },
    {
        title: '📦 Сборка APK Capacitor',
        tags: 'apk capacitor gradle',
        content: `npm install
npx cap sync android
cd android && ./gradlew assembleDebug`,
        copy: 'npm install\nnpx cap sync android\ncd android && ./gradlew assembleDebug'
    },
    {
        title: '🎨 Иконки Android (размеры)',
        tags: 'иконки разрешения размеры',
        content: `mdpi: 48x48
hdpi: 72x72
xhdpi: 96x96
xxhdpi: 144x144
xxxhdpi: 192x192`,
        copy: 'mdpi: 48x48\nhdpi: 72x72\nxhdpi: 96x96\nxxhdpi: 144x144\nxxxhdpi: 192x192'
    },
    {
        title: '📱 Изменить название приложения',
        tags: 'app_name title strings',
        content: `Файл: android/app/src/main/res/values/strings.xml
app_name → "Моё приложение"
title_activity_main → "Моё приложение"
package_name → "com.myname.app"`,
        copy: 'android/app/src/main/res/values/strings.xml\napp_name → "Моё приложение"\ntitle_activity_main → "Моё приложение"\npackage_name → "com.myname.app"'
    },
    {
        title: '🆔 Изменить appId (все места)',
        tags: 'appid capacitor config',
        content: `1. capacitor.config.json
2. android/app/build.gradle
3. strings.xml
4. MainActivity.java`,
        copy: 'capacitor.config.json\nandroid/app/build.gradle\nandroid/app/src/main/res/values/strings.xml\nandroid/app/src/main/java/com/...'
    },
    {
        title: '🚀 GitHub Actions токен',
        tags: 'токен github api',
        content: `Settings → Developer settings → Tokens (classic)
Права: ✅ repo ✅ workflow`,
        copy: 'https://github.com/settings/tokens'
    },
    {
        title: '📥 Скачать APK через Termux',
        tags: 'curl артефакт скачать',
        content: `curl -L -H "Authorization: token ТОКЕН" \\
-H "Accept: application/vnd.github.v3+json" \\
"https://api.github.com/repos/ЮЗЕР/РЕПО/actions/artifacts"`,
        copy: 'curl -L -H "Authorization: token ghp_XXX" -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/iuvic-cmd/REPO/actions/artifacts" | grep -o \'"archive_download_url": "[^"]*"\' | head -1 | cut -d \'"\' -f 4'
    },
    {
        title: '📂 Клонировать репозиторий',
        tags: 'git clone',
        content: `git clone https://github.com/ЮЗЕР/РЕПО.git
cd РЕПО`,
        copy: 'git clone https://github.com/iuvic-cmd/REPO.git\ncd REPO'
    },
    {
        title: '🔄 Коммит и пуш одной командой',
        tags: 'git add commit push',
        content: `git add . && git commit -m "описание" && git push`,
        copy: 'git add . && git commit -m "update" && git push'
    },
    {
        title: '🔑 Сохранить токен в Termux',
        tags: 'export token',
        content: `export TOKEN="ghp_..."
echo $TOKEN`,
        copy: 'export TOKEN="ghp_XXXXXXXXXXXXX"'
    },
    {
        title: '📦 Установка APK из Termux',
        tags: 'install apk termux',
        content: `cp /sdcard/Download/app.apk ~/
cd ~ && mv app.apk base.apk
chmod 755 base.apk`,
        copy: 'cp /sdcard/Download/app.apk ~/ && cd ~ && mv app.apk base.apk && chmod 755 base.apk'
    }
];

const container = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
let toastTimer = null;

// Показ уведомления о копировании
function showToast(text) {
    // Удаляем старое уведомление
    const oldToast = document.getElementById('copyToast');
    if (oldToast) oldToast.remove();
    if (toastTimer) clearTimeout(toastTimer);
    
    const toast = document.createElement('div');
    toast.id = 'copyToast';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
    `;
    toast.textContent = text;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.opacity = '1', 10);
    
    toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 200);
    }, 2000);
}

// Копирование текста в буфер обмена
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('📋 Скопировано! Вставь в Termux (долгое нажатие → Paste)');
    } catch (err) {
        // Fallback для старых WebView
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('📋 Скопировано!');
    }
}

// Рендер карточек
function renderCards(filterText = '') {
    const filter = filterText.toLowerCase().trim();
    
    const filtered = cheats.filter(item => {
        if (filter === '') return true;
        return item.title.toLowerCase().includes(filter) || 
               item.tags.toLowerCase().includes(filter) ||
               item.content.toLowerCase().includes(filter);
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="card" style="text-align: center; color: #95a5a6;">🔎 Ничего не найдено</div>`;
        return;
    }

    let html = '';
    filtered.forEach((item, index) => {
        const copyText = item.copy || item.content;
        html += `
            <div class="card" data-copy="${encodeURIComponent(copyText)}" data-index="${index}">
                <div class="card-title">${item.title}</div>
                <div class="card-content">${item.content.replace(/\n/g, '<br>')}</div>
                <div class="card-hint">👆 Нажми чтобы скопировать</div>
            </div>
        `;
    });
    container.innerHTML = html;
    
    // Добавляем обработчики клика
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const copyText = decodeURIComponent(card.dataset.copy);
            copyToClipboard(copyText);
        });
    });
}

// Поиск
searchInput.addEventListener('input', (e) => {
    renderCards(e.target.value);
});

// Начальный рендер
renderCards();

// Добавляем стиль для подсказки
const style = document.createElement('style');
style.textContent = `
    .card {
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
    }
    .card:hover {
        background: #f8fafc;
    }
    .card-hint {
        text-align: right;
        font-size: 11px;
        color: #bdc3c7;
        margin-top: 12px;
        opacity: 0.7;
    }
    .card:active {
        background: #e8f4fd;
        transform: scale(0.99);
    }
`;
document.head.appendChild(style);
