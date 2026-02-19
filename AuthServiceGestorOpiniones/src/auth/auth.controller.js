import * as authService from './auth.service.js'

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body


    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email y password son obligatorios'
      })
    }

    const result = await authService.register({
      username,
      email,
      password
    })

    res.status(201).json(result)

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  const result = await authService.login(req.body)
  res.json(result)
}

export const verify = async (req, res) => {
  const result = await authService.verify(req.params.token)
  res.json(result)
}