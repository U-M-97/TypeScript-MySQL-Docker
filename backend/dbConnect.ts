import mysql, { Pool } from 'mysql2'

interface DbConfig {
    host: string,
    user: string,
    password: string,
    database: string
}

export const dbConnect = async (): Promise<any> => {
    
    const dbConfig: DbConfig = {
        host: `${process.env.host}`,
        user: `${process.env.user}`,
        password: `${process.env.password}`,
        database: `${process.env.database}`
    }

    const pool: Pool = mysql.createPool(dbConfig).promise()
    
    try{
        if(pool){
            console.log("DB Connected Successfully")
        }
    }catch(err){
        console.log("Failed to connect DB")
    }
    return pool  
}

const pool = dbConnect()
export default pool