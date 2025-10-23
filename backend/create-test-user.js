// Script para crear un usuario de prueba
import { getDB } from './src/db/database.js';
import bcrypt from 'bcryptjs';

async function createTestUser() {
  try {
    const db = await getDB();
    
    // Verificar si ya existe el usuario test
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('test@test.com');
    
    if (existingUser) {
      console.log('✅ Usuario test@test.com ya existe');
      return;
    }
    
    // Crear usuario de prueba
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const result = db.prepare(`
      INSERT INTO users (name, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run('Usuario Test', 'test@test.com', hashedPassword, 'user');
    
    console.log('✅ Usuario test@test.com creado con ID:', result.lastInsertRowid);
    console.log('📧 Email: test@test.com');
    console.log('🔑 Password: 123456');
    
  } catch (error) {
    console.error('❌ Error creando usuario:', error);
  }
}

createTestUser();
