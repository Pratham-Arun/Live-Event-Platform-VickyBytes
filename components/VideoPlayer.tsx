type VideoPlayerProps = {
  url: string;
  title: string;
};

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="relative w-full pt-[56.25%]">
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
