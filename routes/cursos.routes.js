const express = require ("express")
const router = express.Router()
const db = require("../db")

app.get("/", async(req, res) => {
    const [cursos] = await db.execute("SELECT * FROM curso")
    res.json(cursos)
})

app.post("/", async(req, res) => {
    const {nome, descricao, professorid} = req.body

    if(!nome || !descricao || !professorid) {
        return res.status(400).json({error: "nome, descricao, professorid são obrigatorios"})
    }

    const [resultado] = await db.execute(
        "INSERT INTO curso (nome, descricao, professor_id) VALUES (?,?,?)",
        [nome, descricao,professorid]
    )
    return res.status(201).json({ id: resultado.insertId, nome, descricao})
})

app.delete("/:id", async (req, res) => {
    const id = req.params.id //pega o id da url

    const [resultado] = await db.execute(
        "DELETE FROM curso WHERE id = ?",
    [id]
    )

    if(resultado.affectedRows === 0) {
        return res.status(404).json({ error: "curso não encontrado!"})
    }

    return res.status(204).end()
})

module.exports = router