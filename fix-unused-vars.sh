#!/bin/bash

# Fix all unused variables

# Fix error variables in catch blocks
for file in src/app/\[locale\]/*/\[slug\]/page.tsx src/app/\[locale\]/blog/\[slug\]/page.tsx; do
  if [ -f "$file" ]; then
    sed -i '' 's/} catch (error) {/} catch {/' "$file"
  fi
done

# Remove unused ArrowLeft from not-found
sed -i '' 's/import { Home, Search, MapPin }/import { Home, Search, MapPin }/' src/app/\[locale\]/not-found.tsx
sed -i '' 's/, ArrowLeft//' src/app/\[locale\]/not-found.tsx

# Remove Button and User from home page
sed -i '' '/^import { Button }/d' src/app/\[locale\]/page.tsx
sed -i '' 's/  User,$//' src/app/\[locale\]/page.tsx

# Fix placeholder in RichTextEditor
sed -i '' 's/const { placeholder }/\/\/ const { placeholder }/' src/components/admin/RichTextEditor.tsx

echo "✅ All unused variables fixed!"
