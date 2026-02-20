import cors from 'cors'

const corsRules = {
  origin: [
    "http://localhost:5174",
    "http://MeuCadastroSimples.com"
  ],
  credentials: true
}

const Cors = cors(corsRules)

export default Cors
