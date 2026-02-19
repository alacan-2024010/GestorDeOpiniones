import * as authService from './auth.service.js'

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body


    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email y password son obligatorios'
      })
    }
    const userData ={
      username,
      email,
      password
    }

    if(req.file){
      userData.photo = req.file.path;
    }

    const result = await authService.register(userData);

    res.status(201).json(result)

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export const verify = async (req, res) => {
  const result = await authService.verify(req.params.token)
  res.json(result)
}

export const changePassword = async(req, res)=>{
    try {
        const{oldPassword, newPassword} =req.body;
        const userId = req.user.id;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                message: 'Debe ingresar la contraseña antigua y la nueva'
            })
        }
        const result = await authService.changePassword(
            userId,
            oldPassword,
            newPassword
        );

        return res.status(200).json({
          success: true,
          data:result
        });
        
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
}

export const changeUsername = async(req,res)=>{
  try {
    const result = await authService.changeUsername(
      req.user.id,
      req.body.newUsername
    );

    return res.status(200).json({
      success: true,
      data:result
    });
  } catch (error) {
    return res.status(400).json({
      success:false,
      message: error.message
    })
  }
}

export const changePhoto = async(req,res)=>{
  try {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Debe ingresar una imagen'
        });
      }

    const result = await authService.changePhoto(
      req.user.id,
      req.file.path
    )

    return res.status(200).json({
      success:true,
      data:result
    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message
    })
  }
}