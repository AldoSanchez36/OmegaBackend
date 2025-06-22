const supabase = require('../DB/sqlConfig');

class VariablesSQL {
    static async crearVariable(nombre, unidad, proceso_id) {
        const { data, error } = await supabase
            .from('variables')
            .insert([{ nombre, unidad, proceso_id }])
            .select('*');

        if (error) {
            console.error('Error al crear variable:', error);
            return null;
        }

        return data[0];
    }

    static async obtenerVariablesPorProceso(proceso_id) {
        const { data, error } = await supabase
            .from('variables')
            .select('*')
            .eq('proceso_id', proceso_id);

        if (error) {
            console.error('Error al obtener variables:', error);
            return null;
        }

        return data;
    }

    static async obtenerTodasVariables() {
        const { data, error } = await supabase
            .from('variables')
            .select('*');

        if (error) {
            console.error('Error al obtener todas las variables:', error);
            return null;
        }

        return data;
    }

    static async  actualizarVariable(id, nombre, unidad) {
        const { data, error } = await supabase
          .from('variables')
          .update({ nombre, unidad })
          .eq('id', id)
          .select()
          .single()
      
        if (error) return null
        return data
      }
      
      static async  eliminarVariable(id) {
        const { error } = await supabase
          .from('variables')
          .delete()
          .eq('id', id)
      
        return !error
      }
}

module.exports = VariablesSQL;
