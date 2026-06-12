const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');

router.post('/', async (req, res) => {
  const { usuario, correo, descripcion, prioridad } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tickets (usuario, correo, descripcion, prioridad)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [usuario, correo, descripcion, prioridad]
    );

    await axios.post(process.env.TEAMS_WEBHOOK_URL, {
      text: `🆕 *Nuevo Ticket IT*
👤 ${usuario}
📧 ${correo}
🔥 Prioridad: ${prioridad}
📝 ${descripcion}`
    });

    res.status(201).json({
      ok: true,
      ticket: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: 'Error creando ticket'
    });
  }
});

module.exports = router;
