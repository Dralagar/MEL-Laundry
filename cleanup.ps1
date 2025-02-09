# Kill all Node processes
taskkill /F /IM node.exe 2>nul

# Remove problematic directories and files
Remove-Item -Path '.next' -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path 'node_modules' -Recurse -Force -ErrorAction SilentleContinue
Remove-Item -Path 'package-lock.json' -Force -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Create fresh .next directory with proper permissions
New-Item -ItemType Directory -Path '.next' -Force
icacls '.next' /grant 'Users:(OI)(CI)F' /T
