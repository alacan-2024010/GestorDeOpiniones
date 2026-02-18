'use strict';

import{Schema,mongoose} from 'mongoose';

const publicacionesSchema =mongoose.Schema(
    {
        title :{
            type: String,
            required: [true, 'La publicación tiene que tener un título'],
            trim: true,
            maxlength: [70, 'El título de la publicación no puede exceder de 70 caracteres']
        },
        category:{
            type: String,
            required: [true, 'La publicación tiene que tener una categoria']
        },
        content:{
            type:String,
            required: [true, 'La publicación tiene que tener contenido'],
        },
        user:{
            type: String, // viene del JWT de AuthService
            required: true
        }
    },
    {
        timestamps: true 
    }
)


export default mongoose.model('Publicaciones', publicacionesSchema);