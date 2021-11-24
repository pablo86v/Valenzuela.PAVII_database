
const uuid = require('short-uuid');
const db = require('./data/db.json');

const getAll = () => db.mascotas;

const getOne = (id) => db.mascotas.find(i => i.id.toString() == id.toString());

const add = (data) => {
    const {nombre, tipo} = data;

    if(!nombre || !tipo){
        return false;
    }

    const newMascota = {
        nombre, 
        tipo,
        id : uuid.generate() 
    };

    db.mascotas.push(newMascota);
    return true;
}

const update = (data) => {
    const mascotaEditar = db.mascotas.find(e => e.id.toString() === data.id.toString());

    if(mascotaEditar) {
        for(const key in data) {
            if(Object.hasOwnProperty.call(mascotaEditar, key)) {
                mascotaEditar[key] = data[key];
            }
        }
        return true;
    }else{
        return false;
    }
}

const remove = (id) => {
    const mascotaEliminarId = db.mascotas.findIndex(e => e.id.toString() === id.toString());

    if(mascotaEliminarId != -1){
        db.mascotas.splice(mascotaEliminarId, 1);
        return true;
    }else{
        return false;
    }
}

module.exports = {getAll, getOne, add, update, remove};

