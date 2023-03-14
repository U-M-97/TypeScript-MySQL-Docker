import express, { Express, Router, Request, Response } from "express"
import pool from "../dbConnect";

const router: Router = express.Router()

router.post("/addUser", async (req: Request, res: Response): Promise<Response> => {

    const { name, age, email } = req.body
    try{
        const sql: string = `Insert into user (name, age, email) Values (?, ?, ?)`
        const [ result ]: Array<any> = await (await pool).query(sql, [name, age, email])
        if(result){
            const sql2: string = `Select * from user`
            const [ updatedUsers ] = await (await pool).query(sql2)
            return res.send(updatedUsers)
        }
        return res.send(result)
    }catch(err){
        return res.send(err)
    }
    
})

router.delete("/deleteUser", async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.body
    try{
        const sql: string = "Delete from user Where id = ?"
        const [ result ] = await (await pool).query(sql, id)
        const sql2: string = `Select * from user`
        const [ updatedUsers ] = await (await pool).query(sql2)
        return res.send(updatedUsers)
    }catch(err){
        console.log(err)
        return res.send(err)
    }
    
})

router.put("/updateUser", async (req: Request, res: Response): Promise<Response> => {

    try{
        let values: Array<any> = []
        const rows: Array<string> = Object.keys(req.body)
    
        for(let i = 0; i<rows.length; i++){
            values.push(req.body[rows[i]])
        }
        
        const sql: string = `Update user Set ${rows.slice(1).map((row) => `${row} = '${req.body[row]}'`).join(', ')} Where id = ${req.body[rows[0]]}`;        
        const [ result ] = await (await pool).query(sql)
        const sql2: string = "Select * from user"
        const [updatedUser] = await (await pool).query(sql2)
        return res.send(updatedUser)
    }catch(err){
        console.log(err)
        return res.send(err)
    }
    
})

router.get("/", async (req: Request, res: Response): Promise<Response> => {
    try{
        const sql: string = "Select * from user"
        const [users] = await (await pool).query(sql)
        return res.send(users)
    }catch(err){
        return res.send(err)
    }
})

router.delete("/deleteAll", async (req: Request, res: Response): Promise<Response> => {
    try{
        const sql = "Truncate Table user"
        const deleteAll = await (await pool).query(sql)
        console.log(deleteAll)
        return res.send("All records deleted Successfully")
    }catch(err){
        return res.send("Failed to Delete Records")
    }
})

export default router