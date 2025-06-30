const supabase = require('../DB/sqlConfig');

class VariablesToleranciaSQL {
    static async crear({ variable_id, proceso_id, minimo, maximo }) {
        const { data, error } = await supabase
            .from('variables_tolerancia')
            .insert([{ variable_id, proceso_id, minimo, maximo }])
            .select('*');
        if (error) {
            console.error('Error al crear tolerancia:', error);
            return null;
        }
        return data[0];
    }

    static async obtenerTodas() {
        const { data, error } = await supabase
            .from('variables_tolerancia')
            .select('*');
        if (error) {
            console.error('Error al obtener tolerancias:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorId(id) {
        const { data, error } = await supabase
            .from('variables_tolerancia')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error al obtener tolerancia por id:', error);
            return null;
        }
        return data;
    }

    static async actualizar(id, campos) {
        const { data, error } = await supabase
            .from('variables_tolerancia')
            .update(campos)
            .eq('id', id)
            .select('*');
        if (error) {
            console.error('Error al actualizar tolerancia:', error);
            return null;
        }
        return data[0];
    }

    static async eliminar(id) {
        const { error } = await supabase
            .from('variables_tolerancia')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error al eliminar tolerancia:', error);
            return false;
        }
        return true;
    }
}

module.exports = VariablesToleranciaSQL; 