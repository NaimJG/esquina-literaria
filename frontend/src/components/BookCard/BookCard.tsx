// import React from 'react'
import type { BookCardProps } from '../../types/Book';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function BookCard({ libro }: BookCardProps) {
  // Ahora podemos acceder a todas las propiedades de 'libro' directamente.
  return (
    <>
      <Card sx={{ display: 'flex', maxWidth: 600 }}>
        <CardMedia sx={{ width: 200 }}
          component="img"
          alt="green iguana"
          image={libro.cover}
        />
        <Box sx={{ display: 'flex', height: 200, flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {libro.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {libro.synopsis}
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