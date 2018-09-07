const fs = require('fs');
const path = require('path');

const apps = [];

const servicesDir = path.join(__dirname, '../service');
const servicesName = fs.readdirSync(servicesDir);

for (const serviceName of servicesName) {
  const indexPath = path.join(servicesDir, serviceName, 'index.js');
  if (fs.existsSync(indexPath)) {
    const app = {
      name: serviceName,
      script: indexPath,
      instances: 3,
      exec_mode: 'cluster',
    };

    apps.push(app);
  }
}

module.exports = {
  apps,
};
