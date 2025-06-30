const supabase = require('../DB/sqlConfig');

class DocumentosPDFSQL {
    static async crear({ nombre, ruta_archivo, descripcion, planta_id, proceso_id, creado_por }) {
        const { data, error } = await supabase
            .from('documentos_pdf')
            .insert([{ nombre, ruta_archivo, descripcion, planta_id, proceso_id, creado_por }])
            .select('*');
        if (error) {
            console.error('Error al crear documento PDF:', error);
            return null;
        }
        return data[0];
    }

    static async obtenerTodos() {
        const { data, error } = await supabase
            .from('documentos_pdf')
            .select('*');
        if (error) {
            console.error('Error al obtener documentos PDF:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorId(id) {
        const { data, error } = await supabase
            .from('documentos_pdf')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error al obtener documento PDF por id:', error);
            return null;
        }
        return data;
    }

    static async eliminar(id) {
        const { error } = await supabase
            .from('documentos_pdf')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error al eliminar documento PDF:', error);
            return false;
        }
        return true;
    }
}

module.exports = DocumentosPDFSQL; 