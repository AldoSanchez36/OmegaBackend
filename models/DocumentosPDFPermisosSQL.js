const supabase = require('../DB/sqlConfig');

class DocumentosPDFPermisosSQL {
    static async crear({ documento_pdf_id, usuario_id, planta_id, puede_ver, puede_descargar }) {
        const { data, error } = await supabase
            .from('documentos_pdf_permisos')
            .insert([{ documento_pdf_id, usuario_id, planta_id, puede_ver, puede_descargar }])
            .select('*');
        if (error) {
            console.error('Error al crear permiso de documento PDF:', error);
            return null;
        }
        return data[0];
    }

    static async obtenerTodos() {
        const { data, error } = await supabase
            .from('documentos_pdf_permisos')
            .select('*');
        if (error) {
            console.error('Error al obtener permisos de documentos PDF:', error);
            return null;
        }
        return data;
    }

    static async obtenerPorId(id) {
        const { data, error } = await supabase
            .from('documentos_pdf_permisos')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error al obtener permiso de documento PDF por id:', error);
            return null;
        }
        return data;
    }

    static async eliminar(id) {
        const { error } = await supabase
            .from('documentos_pdf_permisos')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error al eliminar permiso de documento PDF:', error);
            return false;
        }
        return true;
    }
}

module.exports = DocumentosPDFPermisosSQL; 