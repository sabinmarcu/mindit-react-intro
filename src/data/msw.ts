import {
  setupWorker,
  rest,
} from 'msw';

import movies from './movies.json';

export type Movie = typeof movies[number];

const getMovie = (id: string) => movies.find((movie) => movie.id === id);
const getIdsFromList = (list: Movie[]) => list.map((movie) => movie.id);

const sleep = async (ms = 1000) => (
  new Promise((resolve) => setTimeout(resolve, ms))
);

const worker = setupWorker(

  rest.get('/movies', async (req, res, ctx) => {
    await sleep(Math.random() * 1000 + 2000);
    return res(
      ctx.json(getIdsFromList(movies)),
    );
  }),

  rest.get<{}, { id: string }>('/movies/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const movie = getMovie(id);
    await sleep(Math.random() * 1000 + 2000);
    if (!movie) {
      return res(
        ctx.status(404),
      );
    }
    return res(ctx.json(movie));
  }),

  rest.post<Movie, { id: string }>('/movies/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const body = (await req.json()) as Movie;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex < 0) {
      return res(
        ctx.status(404),
      );
    }
    movies[movieIndex] = body;
    await sleep(Math.random() * 1000 + 2000);
    return res(ctx.json(body));
  }),

);

worker.start();
