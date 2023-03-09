import express, { Express, Router, Request, Response } from "express"
import pool from "../dbConnect";

const router: Router = express.Router()

router.post("/addUser", async (req: Request, res: Response): Promise<Response> => {

    const { name, age, email } = req.body
    try{
        const sql: string = `Insert into user (name, age, email) Values (?, ?, ?)`
        const [ result ]: Array<any> = await (await pool).query(sql, [name, age, email])
        if(result){
            console.log(result)
            const sql2: string = `Select * from user Where id = ${result.insertId}`
            const [ newUser ] = await (await pool).query(sql2)
            console.log(newUser)
            return res.send(newUser)
        }
        return res.send(result)
    }catch(err){
        return res.send(err)
    }
    
})

router.delete("/deleteUser", async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.body
    try{
        const sql: string = "Delete from user Where id ?"
        const [ result ] = await (await pool).query(sql, id)
        console.log(result)
        return res.send(result)
    }catch(err){
        return res.send(err)
    }
    
})

export default router