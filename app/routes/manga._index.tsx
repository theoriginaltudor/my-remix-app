import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import { mangaList } from "~/types/managList";

export const domain = process.env.BACKEND_URL || "http://localhost:3000";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const apiUrl = q ? `${domain}/api/search/${q}` : `${domain}/api/mangaList`;
  const apiResponse = await fetch(new URL(apiUrl));
  const objectResponse: mangaList = await apiResponse.json();
  return json({ ...objectResponse });
};

export default function Manga() {
  const { mangaList } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center pt-10 gap-10">
      <div className="flex flex-col text-xl">
        <Form>
          <div className="flex gap-6">
            <label htmlFor="search" className="text-xl">
              Find your manga
            </label>
            <input type="search" className="border" name="q" id="search" />
          </div>
        </Form>
      </div>
      <div className="flex gap-5 flex-wrap">
        {mangaList &&
          mangaList.map(({ id, image, title }) => (
            <Link key={id} to={`/manga/${id}`} prefetch="intent">
              <button className="flex gap-5 items-center hover:shadow-lg border rounded-lg p-3">
                <img src={image} alt="" width={80} />
                <h2 className="text-xl max-w-80 text-ellipsis">{title}</h2>
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
}
