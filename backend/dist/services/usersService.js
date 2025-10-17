// backend/services/usersService.ts
import { getDB } from '../db/database.js';
import BaseService from './baseService.js';
/**
 * Servicio para la entidad 'User'.
 * Hereda la lógica CRUD de BaseService y añade métodos específicos para usuarios.
 */
class UsersService extends BaseService {
    constructor() {
        // Define la tabla 'users' y los campos por los que se puede buscar.
        super('users', ['name', 'email']);
    }
    /**
     * Busca un usuario por su dirección de email.
     * @param email El email del usuario a buscar.
     * @returns El objeto User si se encuentra, de lo contrario undefined.
     */
    async findByEmail(email) {
        const db = await getDB();
        const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`;
        return db.prepare(sql).get(email);
    }
    /**
     * Busca un usuario por su token de reseteo de contraseña.
     * @param token El token de reseteo hasheado.
     * @returns El objeto User si se encuentra, de lo contrario undefined.
     */
    async findByResetToken(token) {
        const db = await getDB();
        const sql = `SELECT * FROM ${this.tableName} WHERE resetPasswordToken = ? AND resetPasswordExpire > ?`;
        return db.prepare(sql).get(token, Date.now());
    }
}
export default new UsersService();
//# sourceMappingURL=usersService.js.map