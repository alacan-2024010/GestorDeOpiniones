import Comentarios from './comentarios.model.js';
import Publicaciones from '../publicaciones/publicaciones.model.js';

//Crear comentario
export const createComment = async(req, res)=>{
    try {
        
        const{comment} = req.body;
        const { publicationId } = req.params;

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: 'El comentario es obligatorio'
            });
        }

        const publicationExists = await Publicaciones.findById(publicationId);

        if(!publicationExists){
            return res.status(400).json({
                success:false,
                message: 'La publicación no existe'
            })
        }
        
        const comments = new Comentarios({
            comment,
            user: req.user.id,
            publication: publicationId
        })

        await comments.save();

        res.status(201).json({
            success: true,
            message: 'Comentario agregado correctamente',
            data: comments
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al crear el comentario',
            error: error.message
        })
    }
}

//Listar los comentarios para que la persona pueda verlos
export const getYourComments = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const comments = await Comentarios.find({ user: req.user.id })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort)
            .populate('publication', 'title category');//es lo que trae de la entidad publicaciones

        const total = await Comentarios.countDocuments({ user: req.user.id });

        res.status(200).json({
            success: true,
            data: comments,
            pagination: {
                currentPage: options.page,
                totalPages: Math.ceil(total / options.limit),
                totalRecords: total,
                limit: options.limit
            }
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al listar tus comentarios',
            error: error.message
        });
    }
};

//Actualizar o editar comentario
export const updateComment = async(req, res)=>{
    try {
        const{id} = req.params;
        const comment =  await Comment.findById(id);

        if(!comment){
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado para actualizar'
            })
        }

        if(comment.user !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'No puedes modificar este comentario porque no es tuyo'
            })
        }

        const updateComment = await Comment.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success:true,
            message: 'Comentario actualizado correctamente',
            data: updateComment
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error al actualizar tu comentario',
            error: error.message
        })
    }
}

//Eliminar comentario
export const deleteComment = async(req, res)=>{
    try {
        const{id} = req.params;
        const comment =  await Comentarios.findById(id);

        if(!comment){
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado para eliminar'
            })
        }

        if(comment.user !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar este comentario porque no es tuyo'
            })
        }

        await Comentarios.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message: 'Comentario eliminado correctamente'
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al eliminar comentario',
            error: error.message
        })
    }
}