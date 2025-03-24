import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
import mysql from 'mysql2/promise';
import 'dotenv/config'

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
export default app
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

const dbConfig = {
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
  connectionLimit:10, // Le nombre maximal de connexion simultané
  waitForConnections:true,
  queueLimit:0,
}
const pool = mysql.createPool(dbConfig)

testConnexion()

async function  testConnexion() {
  try{
    // Demander une connexion au pool
    const connexion=await pool.getConnection()
    console.log("Connexion réussie")
    connexion.release()
  }catch (error) {
    console.log("Bonsoir non")
  }
}

async function getFilms() {
  try{
    const resultat =await pool.query('SELECT * FROM films')
    console.log(resultat) // Afficher dans la console la liste des films
    return(resultat[0]) // Retourne une promesse
  }catch (error) {
    console.log('Erreur lors de la récupération des données')
    throw error // Retourner donc une promesse qui ne va pas être résolue
  }
}

getFilms()