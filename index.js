const express = require('express');
const {getAll, getOne, add, update, remove} = require('./controller'); 
const app = express();
const port = 3000;


app.use(express.json());

app.get('/', function (req, res) {
  res.json(getAll());
})

app.get("/:id", (req,res) => {
    res.json(getOne(req.params.id));
})

app.post('/', function (req, res) {
    if(!add(req.body)){
        res.json({ok: false, message: "Faltan datos."});
    }else{
        res.json({ok: true, message: "Información agregada."});
    }
})

app.put('/', function (req, res) {
    if(!update(req.body)){
        res.json({ok: false, message: "No se pudieron actualizar los datos."});
    }else{
        res.json({ok: true, message: "Información actualizada."});
    }
})

app.delete('/:id', function (req, res) {
    if(!remove(req.params.id)){
        res.json({ok: false, message: "No se pudieron eliminar los datos."});
    }else{
        res.json({ok: true, message: "Información eliminada."});
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

