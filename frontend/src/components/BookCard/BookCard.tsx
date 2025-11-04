// import React from 'react'
import { Link } from 'react-router-dom';
import type { BookCardProps } from '../../types/Book';
import { Box, Button, Card, CardContent, CardMedia, Rating, Tooltip, Typography } from '@mui/material';

function BookCard({ libro }: BookCardProps) {
  // Ahora podemos acceder a todas las propiedades de 'libro' directamente.
  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 'min-content', height: 360, backgroundColor: '#fffcfa' }}>
        <CardMedia sx={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'top' }}
          component="img"
          alt="book cover"
          image={libro.cover}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardContent sx={{ padding: 1, minWidth: 140, maxWidth: 140, height: '100%', paddingBottom:0 }}>
            <Tooltip title={libro.title} placement='right'>
              <Typography gutterBottom variant="h5" sx={{ height: 35, textAlign: 'left', fontFamily: 'Poppins', fontSize: '14px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} component="div">
                {libro.title}
              </Typography>
            </Tooltip>
            <Typography gutterBottom variant="h6" sx={{ textAlign: 'left', fontFamily: 'Poppins', fontSize: '13px', fontWeight: 400 }} component="div">
              {libro.author}
            </Typography>
            <Tooltip title={libro.score} placement="right">
              <Box sx={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rating name="read-only" value={libro.score} readOnly precision={0.5} />
              </Box>
            </Tooltip>
          </CardContent>
          <Link to={`/books/${libro.id}`} style={{ textDecoration: 'none' }}>
            <Button size="small" sx={{ fontFamily: 'Poppins', width: '100%', fontSize: '12px', fontWeight: 400 }}>
              Ver
            </Button>
          </Link>
        </Box>
      </Card>
    </>
  );
}

export default BookCard