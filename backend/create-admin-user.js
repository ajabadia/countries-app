// Script para crear el usuario administrador
import { getDB } from './dist/db/database.js';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    const db = await getDB();
    
    // Verificar si ya existe el usuario admin
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('ajabadia@gmail.com');
    
    if (existingUser) {
      console.log('✅ Usuario administrador ya existe');
      console.log('📧 Email:', existingUser.email);
      console.log('👤 Nombre:', existingUser.name);
      console.log('🔑 Rol:', existingUser.role);
      return;
    }
    
    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('Ajabafan1974', 10);
    
    const result = db.prepare(`
      INSERT INTO users (name, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run('Admin User', 'ajabadia@gmail.com', hashedPassword, 'admin');
    
    console.log('✅ Usuario administrador creado con ID:', result.lastInsertRowid);
    console.log('📧 Email: ajabadia@gmail.com');
    console.log('🔑 Password: Ajabafan1974');
    console.log('👤 Rol: admin');
    
  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
  }
}

createAdminUser();
