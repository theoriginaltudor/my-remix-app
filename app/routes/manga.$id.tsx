import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData, useParams } from "@remix-run/react";
import { manga } from "~/types/manga";
import { domain } from "./manga._index";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiResponse = await fetch(new URL(`${domain}/api/manga/${params.id}`));
  const objectResponse: manga = await apiResponse.json();
  return json({ ...objectResponse });
};

export default function MangaPage() {
  const { imageUrl, name, status, genres, chapterList } =
    useLoaderData<typeof loader>();
  const params = useParams();
  return (
    <div className="flex flex-col items-center pt-10 gap-10">
      <div className="w-11/12 lg:w-1/2 border rounded-lg">
        <div className="flex gap-8 overflow-hidden">
          <img src={imageUrl} alt="" width={200} />
          <div className="flex flex-col gap-5 pt-8">
            <h1 className="text-2xl">{name}</h1>
            <p>Status: {status}</p>
            <p>Genres: {genres.toString()}</p>
          </div>
        </div>
        <hr />
        <ul className="flex flex-col gap-2 ">
          {chapterList
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map(({ name, id, view }) => (
              <Link to={`/manga/${params.id}/${id}`} key={id} prefetch="intent">
                <div className="text-xl p-3 border-b">{name}</div>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}
