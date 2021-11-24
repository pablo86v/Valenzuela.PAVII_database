const express = require('express');
const uuid = require('short-uuid');
const app = express();
const port = 3000;
const db = require('./data/db.json');


app.use(express.json());

app.get('/', function (req, res) {
  res.json(db);
})

app.get("/:id", (req,res) => {
    res.json(db.mascotas.find(i => i.id == req.params.id));
})

app.post('/', function (req, res) {
    const {nombre, tipo} = req.body;

    if(!nombre || !tipo){
        res.json({ok: false, mensaje: "Faltan datos."});
        return;
    }

    const newMascota = {
        nombre, 
        tipo,
        id : uuid.generate() 
    };

    db.mascotas.push(newMascota);
    res.json(db.mascotas);
})

app.put('/', function (req, res) {
    const mascotaEditar = db.mascotas.find(e => e.id.toString() === req.body.id.toString());

    if(mascotaEditar) {
        for(const key in req.body) {
            if(Object.hasOwnProperty.call(mascotaEditar, key)) {
                mascotaEditar[key] = req.body[key];
            }
        }
        res.json({
            ok: true,
            msg: 'Mascota editada'
        });
        return;
    }else{
        res.json({
            ok: false,
            msg: 'Mascota no encontrada'
        });
    }
})

app.delete('/:id', function (req, res) {
    const mascotaEliminarId = db.mascotas.findIndex(e => e.id.toString() === req.params.id.toString());

    if(mascotaEliminarId != -1){
        db.mascotas.splice(mascotaEliminarId, 1);
        res.json({
            ok: true,
            msg: 'Mascota eliminada'
        });
        return;
    }else{
        res.json({
            ok: false,
            msg: 'Mascota no encontrada'
        });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

