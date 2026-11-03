import jwt from 'jsonwebtoken'

// Middleware: -- Token authentication --
export function authToken(req, res, next){
<<<<<<< HEAD
    const authHeader = req.headers["authorization"]

    if(!authHeader){
      res.status(401).json({error: "Token não encontrado"})
      return;
    }

    const authorization =  authHeader.split(" ")
    const token = req.cookies.token || authorization[1]
=======
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];
    //const authHeader = req.headers["authorization"]
    /*if(!authHeader){
      res.status(401).json({error: "Token não encontrado"})
      return;
    }*/

    //const authorization =  authHeader.split(" ")
    //const token = req.cookies?.token || authorization[1]
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)

    if(!token){
        res.status(401).json({error: "Token não encontrado"})
        return;
    }

    try{
        const usertk = jwt.verify(token, process.env.SECRETJWT)

        if(!usertk.id){
            res.status(401).json({error: "Usuário não identificado"})
            return;
        }

        if(!usertk.email){
            res.status(401).json({error: "Usuário não identificado"})
            return;
        }
        req.user = usertk
        next()
    } catch (err){
        return res.status(500).json({msg: "Falha do servidor ao processar identificação do usuário, por favor tente novamente mais tarde", error: err})
    }
}

// Middleware: -- SignUp/Login BODY verification --
export function authBody(req, res, next){
  const {email, password} = req.body

  if(!req.body){
    return res.status(401).json({err: "invalid request"})
  }

<<<<<<< HEAD
  if(!req.body.email){
=======
  if(!email){
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)
    res.status(401).json({error: "email is required!"})
    return;
  }

  if(!password){
    res.status(401).json({error: "password is required!"})
    return;
  }

  if(!email.includes("@")){
    res.status(401).json({error: "email is not valid"})
    return;
  }

  if(!email.includes(".")){
    res.status(401).json({error: "email is not valid"})
    return;
  }

  next()
}


export function authUpdatePatch(req, res, next){
  const id = req.params.id
  const {update: optionToUpdate} = req.body

  if(!id){
    return res.status(401).json({err: "Need the User ID"})
  }

  if(!optionToUpdate){
    return res.status(401).json({err: "Not found option to update"})
  }

  const allowedFields = ["email", "password"]

  for (let key in optionToUpdate) {
    if (!allowedFields.includes(key)) {
      return res.status(401).json({ err: "Fields not allowed" });
    }
  }
  next()
}

export function authUpdatePut(req, res, next){
  const {updates: optionsToUpdate} = req.body
  res.send(optionsToUpdate) 
}



<<<<<<< HEAD
export function authPost(req, res, next){
=======
export function authCreatePost(req, res, next){
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)
  const { user, comment } = req.body

  if(!user || !comment){
    return res.status(401).json({err: "No data found to create post"})
  }

  next()
}
<<<<<<< HEAD
=======

export function authDeletePost(req, res, next){
  const postId = req.params.id
  if(!postId){
    return res.status(401).send("no post ID found")
  }

  next()
}
>>>>>>> 79d3f5c (feat: some routes updated and added, but not finalized)
