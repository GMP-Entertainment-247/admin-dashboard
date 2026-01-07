import { Music } from "lucide-react";

interface BeatViewLayoutProps {
  name: string;
  description: string;
  genre?: string;
  rapBattleTitle?: string;
  image: string;
  beatFile: string;
  createdDate?: string;
}

const BeatViewLayout: React.FC<BeatViewLayoutProps> = ({
  name,
  description,
  genre,
  rapBattleTitle,
  image,
  beatFile,
  createdDate,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-[30px]">
      <article className="lg:w-[56%]">
        <h3 className="text-xl md:text-2xl font-semibold text-grey-normal mb-5 line-clamp-2">
          {name}
        </h3>
        <div
          className="text-xs md:text-sm text-grey-normal font-normal mb-8 lg:mb-10"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="space-y-6 [&>div]:space-y-2">
          {genre && (
            <div>
              <p className="text-lg font-medium text-[#212121]">Genre</p>
              <p className="text-sm text-gray-600">{genre}</p>
            </div>
          )}
          {rapBattleTitle && (
            <div>
              <p className="text-lg font-medium text-[#212121]">Rap Battle</p>
              <p className="text-sm text-gray-600">{rapBattleTitle}</p>
            </div>
          )}
          {createdDate && (
            <div>
              <p className="text-lg font-medium text-[#212121]">Created</p>
              <p className="text-sm text-gray-600">
                {new Date(createdDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </article>
      <aside className="lg:flex-1 space-y-10 lg:mt-4">
        <img
          src={image}
          alt="beat-cover"
          className="w-full aspect-[1.7] object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder-beat.jpg";
          }}
        />
        {beatFile && (
          <div className="border border-[#999999] rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand-25 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-brand-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Beat Preview</p>
                <p className="text-xs text-gray-500">Listen to the beat</p>
              </div>
            </div>
            <audio controls className="w-full" src={beatFile}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </aside>
    </div>
  );
};

export default BeatViewLayout;
