import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { logOutRequest } from '../api/user';
import clsx from 'clsx';
import { useUser } from '../context/UserContext';

const ResourceDetailCard = ({ resource }) => {
  const { user } = useUser();
  const {
    title,
    description,
    author,
    publishDate,
    image,
    level,
    discipline,
    subDicipline,
  } = resource;
  const [rating, setRating] = useState(4);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [ratingComment, setRatingComment] = useState('');
  const tooltipArray = ['Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'];

  const handleRating = (index) => {
    console.log(index);
    setRating(index);
  };

  const handleValoration = () => {
    console.log(rating, ratingComment);
    const newValoration = {
      rating,
      comment: ratingComment,
      userId: user?._id,
      eventId: resource._id,
    };
    console.log(newValoration);
  };

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden m-4'>
      <div className='p-4'>
        <h2 className='font-bold text-2xl md:text-4xl my-4'>{title}</h2>
        <img
          src={image}
          alt='Resource'
          className='w-96 h-auto my-4'
        />
        <p className='text-black text-xl md:text-2xl my-4'>{description}</p>
        <p className='text-black text-xl my-2'>Autor: {author}</p>
        <p className='text-black text-xl my-2'>Publicado: {publishDate}</p>
        <p className='text-black text-xl my-2'>Nivel: {level}</p>
        <p className='text-black text-xl my-2'>Disciplina: {discipline}</p>
        <p className='text-black text-xl mt-2 mb-4'>
          Subdisciplina: {subDicipline}
        </p>
      </div>

      {/* Comentarios y valoraciones */}
      <div className='bg-gray-100 p-4'>
        <h3 className='text-lg font-semibold mb-4'>
          Deja tu comentario y valoración
        </h3>
        <div className='mb-4'>
          <textarea
            onChange={(e) => setRatingComment(e.target.value)}
            className='w-full p-2 text-gray-700 border rounded-lg focus:outline-none'
            rows='4'
            placeholder='Deja tu comentario...'></textarea>
        </div>
        {user && (
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center justify-between gap-2'>
              <Rating
                SVGclassName={`inline-block`}
                onClick={handleRating}
                initialValue={rating}
                transition
                size={25}
                showTooltip
                tooltipArray={tooltipArray}
                tooltipClassName={clsx(
                  'text-xs p-1 px-2',
                  rating === 0 && 'hidden',
                  rating === 1 && 'bg-red-500',
                  rating === 2 && 'bg-yellow-500',
                  rating === 3 && 'bg-green-500',
                  rating === 4 && 'bg-green-500',
                  rating === 5 && 'bg-green-500'
                )}
              />
              <button
                onClick={() => setRating(0)}
                type='button'
                className='p-1 mr-10 text-xs bg-black text-white px-2 rounded-md'>
                Reset stars
              </button>
            </div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs'
              onClick={handleValoration}>
              Enviar
            </button>
          </div>
        )}
      </div>

      {/* Ver más / menos */}
      <div className=' flex items-center justify-end py-4'>
        {' '}
        {/* TODO: Quitar bg */}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs mr-4'
          onClick={() => setMostrarComentarios(!mostrarComentarios)}>
          {mostrarComentarios ? 'Ocultar comentarios' : 'Ver comentarios'}
        </button>
      </div>
    </div>
  );
};

export default ResourceDetailCard;
