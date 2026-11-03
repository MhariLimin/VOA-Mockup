/* The video library. The one video on the live website's Videos page (read 3 November 2026), with
   its WordPress media title. The file stays in the WordPress media library: the theme plays it from
   wp-content/uploads, and the mockup from the live site's copy of the same file. The poster is a
   still from the video itself. No captions or transcript exist yet. */
export interface VideoItem {
  title: string;
  /* Path below wp-content/uploads/. */
  upload: string;
  poster: string;
}

export const videos: readonly VideoItem[] = [
  { title: 'Contracts', upload: '2020/09/Contracts.mp4', poster: '/assets/client/videos/contracts-poster.jpg' },
];

export const videoSource = (video: VideoItem) => `https://virtualofficeangels.com.au/wp-content/uploads/${video.upload}`;
