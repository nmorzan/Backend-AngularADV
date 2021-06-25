/*Ruta: /api/upload */

const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/vaidar-jwt');
const {uploadImg, verFoto} = require('../controllers/uploads');
const fileUpload = require('express-fileupload');



router.use(fileUpload());

router.put('/:tipo/:id',[validarJWT], uploadImg);
router.get('/:tipo/:foto', verFoto);




module.exports= router;