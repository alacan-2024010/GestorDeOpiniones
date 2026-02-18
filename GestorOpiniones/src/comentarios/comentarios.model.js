'use strict';

import mongoose from 'mongoose';

const comentariosSchema = mongoose.Schema(
    {
        comment:{
            type: String,
            required: [true, 'El comentario es obligatorio'],
            maxlength: [400, 'El comentario no puede superar los 400 caracteres']
        },
        user:{
            type: String, // viene del JWT de AuthService
            required: [true, 'Tienes que colocar un uid válido']
        },
        post:{
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Tienes que colocar el id de la publicación válido']
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Comentarios', comentariosSchema);