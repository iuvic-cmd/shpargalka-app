from PIL import Image, ImageDraw
import os
import math

def create_gradient_background(size, color1, color2):
    """Создаёт градиентный фон"""
    img = Image.new('RGB', size)
    draw = ImageDraw.Draw(img)
    
    width, height = size
    for y in range(height):
        # Интерполяция между цветами
        r = int(color1[0] + (color2[0] - color1[0]) * y / height)
        g = int(color1[1] + (color2[1] - color1[1]) * y / height)
        b = int(color1[2] + (color2[2] - color1[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def draw_wallet(draw, center_x, center_y, scale):
    """Рисует кошелёк"""
    # Основной прямоугольник кошелька
    wallet_left = center_x - 180 * scale
    wallet_top = center_y - 120 * scale
    wallet_right = center_x + 180 * scale
    wallet_bottom = center_y + 140 * scale
    
    # Тёмно-синий цвет для кошелька
    wallet_color = '#1a3a52'
    
    # Рисуем основной корпус
    draw.rounded_rectangle(
        [(wallet_left, wallet_top), (wallet_right, wallet_bottom)],
        radius=20 * scale,
        fill=wallet_color,
        outline='#0d2847',
        width=4
    )
    
    # Верхняя часть (открытый кошелёк)
    draw.polygon([
        (wallet_left + 20 * scale, wallet_top),
        (wallet_right - 20 * scale, wallet_top),
        (wallet_right, wallet_top + 60 * scale),
        (wallet_left, wallet_top + 60 * scale)
    ], fill='#25547c')
    
    # Символ доллара
    dollar_y = center_y + 20 * scale
    draw.text(
        (center_x - 50 * scale, dollar_y - 40 * scale),
        '$',
        fill='white',
        font_size=int(120 * scale)
    )
    
    # Застёжка (круг сбоку)
    buckle_center_x = wallet_right - 40 * scale
    buckle_center_y = center_y + 80 * scale
    buckle_radius = 30 * scale
    
    draw.ellipse([
        (buckle_center_x - buckle_radius, buckle_center_y - buckle_radius),
        (buckle_center_x + buckle_radius, buckle_center_y + buckle_radius)
    ], fill='#25547c', outline='#0d2847', width=3)
    
    # Дырка в застёжке
    draw.ellipse([
        (buckle_center_x - 10 * scale, buckle_center_y - 10 * scale),
        (buckle_center_x + 10 * scale, buckle_center_y + 10 * scale)
    ], fill='#1a3a52')

# Создаём изображение 1024x1024 с градиентным фоном
size = (1024, 1024)
img = create_gradient_background(size, (135, 206, 250), (30, 144, 255))  # Light blue to Dodger blue
draw = ImageDraw.Draw(img)

# Рисуем кошелёк по центру
center_x, center_y = 512, 512
draw_wallet(draw, center_x, center_y, scale=1.0)

# Сохраняем исходник
img.save('icon_source.png')
print("✅ Исходная иконка создана: icon_source.png")

# Генерируем все размеры для Android
sizes = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
}

base_path = 'android/app/src/main/res'

for folder, size in sizes.items():
    os.makedirs(f'{base_path}/mipmap-{folder}', exist_ok=True)
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(f'{base_path}/mipmap-{folder}/ic_launcher.png')
    resized.save(f'{base_path}/mipmap-{folder}/ic_launcher_round.png')
    print(f"✅ {folder}: {size}x{size}")

print("\n🎉 Все иконки сгенерированы!")
