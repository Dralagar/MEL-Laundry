const { exec } = require('child_process');

const ports = [3000, 3001, 3002, 5000];

ports.forEach(port => {
  const command = process.platform === 'win32'
    ? `netstat -ano | findstr :${port}`
    : `lsof -i :${port}`;

  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      const pid = process.platform === 'win32'
        ? stdout.split('\n')[0].split(' ').filter(Boolean).pop()
        : stdout.split('\n')[1]?.split(' ').filter(Boolean)[1];

      if (pid) {
        const killCommand = process.platform === 'win32'
          ? `taskkill /F /PID ${pid}`
          : `kill -9 ${pid}`;

        exec(killCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error killing process on port ${port}:`, error);
          } else {
            console.log(`Successfully killed process on port ${port}`);
          }
        });
      }
    }
  });
}); 