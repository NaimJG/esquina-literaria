// import React from 'react'
import type { BookCardProps } from '../../types/Book';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function BookCard({ libro }: BookCardProps) {
  // Ahora podemos acceder a todas las propiedades de 'libro' directamente.
  return (
    <>
      <Card sx={{ maxWidth: 600, height: '100%', display: 'flex' }}>
        <CardMedia sx={{ width: 200 }}
          component="img"
          alt="green iguana"
          image="/img/contemplative-reptile.jpg"
        />
        <Box sx={{ display: 'flex', height: 200, flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {libro.title}
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
        </Box>
      </Card>
    </>
  );
}

export default BookCard