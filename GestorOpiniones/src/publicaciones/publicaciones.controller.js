import Publicaciones from './publicaciones.model.js';

//Crear publicación
export const createPublication = async(req,res)=>{
    try {
        const{title,category,content}= req.body;

        //validación para que ningún campo este vacío
        if(!title || !category || !content){
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            })
        }

        const publication = new Publicaciones({
            title,
            category,
            content,
            user: req.user.id
        })

        await publication.save();
        
        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: publication
        })
    
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al crear la Publicación',
            error: error.message
        })
    }
}

//Listar publicaciones
export const getPublications = async(req,res)=>{
    try {

        const { page = 1, limit = 15 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const publications = await Post.find()
            .limit(options.limit * 1)
            .skip((options.page - 1) * options.limit)
            .sort(options.sort);

        const total = await Post.countDocuments();

        res.status(200).json({
            success: true,
            data: publications,
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
            message: 'Error al listar las publicaciones',
            error: error.message
        })
    }
}

//Listar publicación por id
export const getPublicationById = async(req,res)=>{
    try {
        const{id} = req.params;

        const publication = await Publicaciones.findById(id);

        if (!publication){
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publicación encontrada',
            data: publication,
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al buscar la publicación '
        })
    }
}

//Actualizar publicación
export const updatePublication = async(req,res)=>{
    try {
        const{id} = req.params;

        const publication = await Publicaciones.findById(id);

        if (!publication){
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        //No modificar una publicación que no sea de esa persona
        if (publication.user !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No puedes modificar esta publicación porque no es tuya'
            });
        }

        const updatedPublication = await Post.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success:true,
            message: 'Publicación actualizada correctamente',
            data: updatedPublication,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al actualizar la publicación',
            error: error.message
        })
    }
}

export const deletePublication = async(req,res)=>{
    try {
        const{id} = req.params;

        const publication = await Publicaciones.findById(id);

        if (!publication){
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        //No eliminar una publicación que no sea de esa persona
        if (publication.user !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar esta publicación porque no es tuya'
            });
        }

        await Publicaciones.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message: 'La publicación fue eliminada'
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: 'Error al eliminar la publicacíon',
            error:error.message
        })
    }
}