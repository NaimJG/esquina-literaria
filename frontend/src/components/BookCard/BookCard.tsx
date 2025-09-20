import React from 'react'
import type { BookCardProps } from '../../types/Book';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function BookCard({ libro }: BookCardProps) {
  // Ahora podemos acceder a todas las propiedades de 'libro' directamente.
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/img/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {libro.titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Comprar</Button>
          <Button size="small">Ver más</Button>
        </CardActions>
      </Card>
      <div className="book-card">
        {/* Aquí va el HTML que antes tenías en Library.jsx */}
        <h3>{libro.titulo}</h3>
        <p>{libro.genero} - {libro.año}</p>
        {/* Podrías agregar más cosas, como una imagen de portada */}
        {/* <img src={libro.portadaUrl} alt={`Portada de ${libro.titulo}`} /> */}
      </div>
    </>
  );
}

export default BookCard