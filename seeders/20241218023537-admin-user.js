'use strict';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export async function up(queryInterface, Sequelize) {
  //TODO: Remove this console.log
  console.log('CREATING ADMIN USER FROM ENVIRONMENT VARIABLES');
  console.log('Username: ', process.env.ADMIN_USERNAME);
  console.log('Password: ', process.env.ADMIN_PASSWORD);
  const username = process.env.ADMIN_USERNAME || 'defaultUsername';
  const password = process.env.ADMIN_PASSWORD || 'defaultPassword';
  console.log('SEEDING ADMIN USER: ', username, ' ',password);
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