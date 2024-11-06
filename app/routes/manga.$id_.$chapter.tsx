import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { mangaChapter } from "~/types/mangaChapter";
import { domain } from "./manga._index";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiResponse = await fetch(
    new URL(`${domain}/api/manga/${params.id}/${params.chapter}`)
  );
  const [prefix, currentChapter] = params.chapter?.split("-") || ["", ""];
  const controlData: Props = {
    manga: params.id || "",
    prev: `${prefix}-${parseInt(currentChapter) - 1}` || "",
    next: `${prefix}-${parseInt(currentChapter) + 1}` || "",
  };

  const objectResponse: mangaChapter = await apiResponse.json();
  return json({
    ...objectResponse,
    controlData,
  });
};

export default function MangaChapter() {
  const { images, controlData } = useLoaderData<typeof loader>();
  return (
    <>
      <PrevNext {...controlData} />
      {images.map((page) => (
        <img src={page.image} className="w-full" />
      ))}
      <PrevNext {...controlData} />
    </>
  );
}

type Props = {
  prev: string;
  next: string;
  manga: string;
};

const PrevNext = ({ prev, next, manga }: Props) => {
  return (
    <div className="bg-black text-xl text-white flex justify-center gap-10">
      <Link
        to={`/manga/${manga}/${prev}`}
        className="border-white border p-3"
        prefetch="intent"
      >
        {"<<"} Previous
      </Link>
      <Link
        to={`/manga/${manga}`}
        className="border-white border p-3"
        prefetch="intent"
      >
        Details page
      </Link>
      <Link
        to={`/manga/${manga}/${next}`}
        className="border-white border p-3"
        prefetch="intent"
      >
        Next {">>"}
      </Link>
    </div>
  );
};
