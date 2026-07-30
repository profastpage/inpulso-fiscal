import re

with open('src/app/suscripciones/SuscripcionesPage.tsx', 'r') as f:
    content = f.read()

# Find all backslash-backtick sequences
bad = [(m.start(), m.group()) for m in re.finditer(r'\\`', content)]
print(f'Found {len(bad)} escaped backticks')
for pos, _ in bad[:10]:
    print(f'  pos {pos}: ...{content[max(0,pos-10):pos+15]}...')

# Replace escaped backticks with real backticks
content = content.replace('\\`', '`')

with open('src/app/suscripciones/SuscripcionesPage.tsx', 'w') as f:
    f.write(content)
print('Fixed!')
