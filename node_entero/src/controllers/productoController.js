const controller = {}
controller.listar = (req,res) => {          //peticion get request y response como parametros
    //res.send('hola mundo')              //metodo send para imprimir en pantalla
    req.getConnection((err, conn) => {      //error o conexion (gracias al middleware configurado en app)
        conn.query('SELECT * FROM producto', (err, productos) => {  //error o listado de productos
            if(err){                        //asi se manejan los errores
                res.json(err);
            }
            res.render('productos', {
                data: productos
            })
        })
    })
}

controller.guardar = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO producto set ?',[data], (err, producto) => {
            console.log(producto);
            res.redirect('/');
        })
    })
}

controller.editar = (req,res) => {
    const {id} = req.params;
    req.getConnection( (err,conn) => {
        conn.query("SELECT * FROM producto WHERE idproducto = ? ", [id], (err, producto ) => {
            res.render('producto_edit', {
                data: producto[0]
            })
        })
    })
};

controller.actualizar = (req,res) => {
    const {id} = req.params;
    const productoActualizar = req.body;
    req.getConnection( (err, conn) => {
        conn.query('UPDATE producto set ? WHERE idproducto = ?',[productoActualizar, id], (err, rows) => {
            res.redirect('/');
        })
    })
}

controller.eliminar = (req,res) => {
    const id = req.params.id;
    req.getConnection( (err,conn) => {
        conn.query('DELETE FROM producto WHERE idproducto = ? ',[id], (err, rows) => {
            res.redirect('/');
        });
    })
}

module.exports = controller;