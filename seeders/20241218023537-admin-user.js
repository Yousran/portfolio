'use strict';
import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  const username = process.env.ADMIN_USERNAME || 'defaultUsername';
  const password = process.env.ADMIN_PASSWORD || 'defaultPassword';
  const hashedPassword = await bcrypt.hash(password, 10);
  await queryInterface.bulkInsert('Users', [{
    username: username,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}