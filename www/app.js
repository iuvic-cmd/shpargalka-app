const cheats = [
    {
        title: '🟢 Git основные команды',
        tags: 'git коммит пуш',
        content: `git init — создать репо
git add . — добавить всё
git commit -m "текст" — сохранить
git push origin main — отправить
git pull — забрать изменения`
    },
    {
        title: '🐍 Python в Termux',
        tags: 'python термукс установка',
        content: `pkg install python — установка
python script.py — запустить
pip install requests — пакеты`
    },
    {
        title: '📦 Сборка APK Capacitor',
        tags: 'apk capacitor gradle',
        content: `1. npm install
2. npx cap sync android
3. cd android && ./gradlew assembleDebug
APK: android/app/build/outputs/apk/debug/`
    },
    {
        title: '🎨 Иконки Android',
        tags: 'иконки разрешения размеры',
        content: `mdpi: 48x48
hdpi: 72x72
xhdpi: 96x96
xxhdpi: 144x144
xxxhdpi: 192x192
⚠️ Удалить папку mipmap-anydpi-v26!
Генерация: PIL скриптом`
    },
    {
        title: '📱 Изменить название приложения',
        tags: 'app_name title strings',
        content: `Файл: android/app/src/main/res/values/strings.xml
Строки для замены:
app_name → "Моё приложение"
title_activity_main → "Моё приложение"
package_name → "com.myname.app"
custom_url_scheme → "com.myname.app"`
    },
    {
        title: '🆔 Изменить appId',
        tags: 'appid capacitor config',
        content: `Файл: capacitor.config.json
{
  "appId": "com.myname.myapp",
  "appName": "Моё приложение",
  "webDir": "www"
}`
    },
    {
        title: '🚀 GitHub Actions токен',
        tags: 'токен github api',
        content: `Settings → Developer settings → Tokens (classic)
Нужны права: ✅ repo, ✅ workflow
Токен начинается с ghp_`
    },
    {
        title: '📥 Скачать APK через Termux',
        tags: 'curl артефакт скачать',
        content: `curl -L -H "Authorization: token ТОКЕН" \\
-H "Accept: application/vnd.github.v3+json" \\
"https://api.github.com/repos/ЮЗЕР/РЕПО/actions/artifacts"

Потом unzip архив → установка`
    }
];
