export interface mangaChapter {
  title: string,
  currentChapter: string,
  chapterListIds: ChapterListId[],
  images: ChapterImage[],
}

type ChapterListId = {
  id: string,
  name: string
}

type ChapterImage = {
  title: string;
  image: string;
}