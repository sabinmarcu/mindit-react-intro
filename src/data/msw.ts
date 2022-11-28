import {
  setupWorker,
  rest,
} from 'msw';

import movies from './movies.json';

export type Movie = typeof movies[number];

const getMovie = (id: string) => movies.find((movie) => movie.id === id);

const worker = setupWorker(

  rest.get('/movies', async (req, res, ctx) => res(
    ctx.json(movies),
  )),

  rest.get<{}, { id: string }>('/movies/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const movie = getMovie(id);
    if (!movie) {
      return res(
        ctx.status(404),
      );
    }
    return res(ctx.json(movie));
  }),

);

worker.start();
