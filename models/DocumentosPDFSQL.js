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

    static async obtenerReportesDashboard(usuario_id) {
        const supabase = require('../DB/sqlConfig');
        // 1. Obtener permisos del usuario
        const { data: permisos, error: errorPermisos } = await supabase
            .from('documentos_pdf_permisos')
            .select('documento_pdf_id')
            .eq('usuario_id', usuario_id)
            .eq('puede_ver', true);
        if (errorPermisos) {
            console.error('Error al obtener permisos de documentos PDF:', errorPermisos);
            return [];
        }
        const docIds = permisos.map(p => p.documento_pdf_id);
        if (docIds.length === 0) return [];
        // 2. Obtener documentos PDF
        const { data: docs, error: errorDocs } = await supabase
            .from('documentos_pdf')
            .select('*')
            .in('id', docIds);
        if (errorDocs) {
            console.error('Error al obtener documentos PDF:', errorDocs);
            return [];
        }
        // 3. Obtener nombres de planta y proceso
        const PlantasSQL = require('./PlantasSQL');
        const ProcesosSQL = require('./ProcesosSQL');
        const result = [];
        for (const doc of docs) {
            let planta = null;
            let proceso = null;
            if (doc.planta_id) planta = await PlantasSQL.obtenerPorId ? await PlantasSQL.obtenerPorId(doc.planta_id) : null;
            if (doc.proceso_id) proceso = await ProcesosSQL.obtenerPorId ? await ProcesosSQL.obtenerPorId(doc.proceso_id) : null;
            result.push({
                id: doc.id,
                titulo: doc.nombre,
                planta: planta ? planta.nombre : '',
                sistema: proceso ? proceso.nombre : '',
                estado: 'Completado',
                fecha: doc.creado_en ? doc.creado_en.split('T')[0] : '',
                ruta_archivo: doc.ruta_archivo
            });
        }
        return result;
    }
}

module.exports = DocumentosPDFSQL; 