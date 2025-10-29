import BlogInnerLayout from "./inner-layout";
import image from "../../../images/rap-battle.jpg";
import { comments } from "./data";
import Comment from "../../../components/Comment";
import PostActions from "../../../components/PostActions";

const PreviewBlog = () => {
  return (
    <BlogInnerLayout title="Preview">
      <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10">
        <article className="lg:w-[56%]">
          <h3 className="text-sm md:text-base font-semibold text-grey-normal mb-5 line-clamp-2">
            GMP Entertainment 247 to commence 4th Rap Battle Audition
          </h3>
          <p className="text-xs md:text-sm text-grey-normal font-normal mb-8">
            Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis
            nisl ipsum aliquam vestibulum a ut. Neque non nec morbi aliquam vel
            eu lorem tellus. Fames sit cras egestas ipsum. Eleifend duis
            suspendisse ultrices est lorem id duis. Morbi sollicitudin bibendum
            libero vel. Vitae lacus orci tincidunt posuere interdum id. Sed sed
            eget integer at. Mollis nec vitae purus nulla aliquet. Ipsum arcu
            magna commodo et. Et viverra laoreet ut tempor urna. Nulla id ipsum
            leo rhoncus iaculis natoque. Hendrerit id amet bibendum nunc auctor.
            Id et porta adipiscing et at tellus in viverra.
            <br />
            <br />
            Pellentesque viverra arcu tempor egestas nisi feugiat malesuada.
            Cursus amet tincidunt viverra gravida posuere cursus. Rhoncus in
            mattis porttitor egestas ligula id nulla lorem ac. Orci adipiscing
            amet vel dignissim mattis quis. Dolor tempus faucibus pellentesque
            amet risus ullamcorper ullamcorper. Vitae mi auctor amet id. Velit
            integer ut cras vel nunc et integer porttitor orci. Massa velit
            morbi dolor etiam accumsan elementum varius feugiat. Orci euismod
            tincidunt mi lobortis ultrices ante diam pretium quam
            <br />
            <br />
            Malesuada elit vel quis maecenas rutrum ac convallis ut. Dui blandit
            id magna scelerisque. Pharetra mi et porttitor augue aliquam ut
            penatibus ridiculus. Volutpat donec eget massa eget eget leo
            suspendisse auctor. Sit faucibus elit ultrices malesuada pharetra
            hac sed tellus in.
            <br />
            <br />
            Ullamcorper arcu velit ultrices risus sit aliquam tristique massa.
            Senectus consequat sit ipsum ullamcorper massa blandit urna.
            Volutpat enim velit auctor habitasse. Nullam sem quis mauris viverra
            aliquam mattis viverra sagittis enim. Etiam consectetur quam non
            ipsum ut egestas ultrices. Luctus tincidunt mollis non semper morbi.
            Mi quis maecenas pretium arcu. Nisl facilisis mi in nullam nec felis
            diam. Blandit ut ullamcorper et quis consectetur eu arcu amet. Erat
            amet sed consequat eget.
            <br />
            <br />
            Nibh nunc egestas vel aliquet. Pellentesque quis mattis orci amet
            malesuada lectus. In pulvinar euismod sed mi arcu cursus amet
            suscipit. Diam venenatis donec nulla dolor. Aliquet neque a at
            lobortis commodo.
          </p>
          <PostActions likes={10} dislikes={2} comments={10} />
        </article>
        <aside className="lg:flex-1 space-y-10 lg:mt-4">
          <div className="w-full flex gap-3">
            <div className="flex-1 aspect-[1.47] rounded-lg overflow-hidden relative">
              <img
                src={image}
                alt="blog"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div className="flex-1 aspect-[1.47] rounded-lg overflow-hidden relative">
              <img
                src={image}
                alt="blog"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div className="flex-1 aspect-[1.47] rounded-lg overflow-hidden relative">
              <img
                src={image}
                alt="blog"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#000] mb-5">
              Comments
            </h3>
            <div className="my-5 h-[1px] bg-[#E9E9E9]" />
            <div>
              {comments.map((comment, idx) => (
                <div key={comment.id}>
                  <Comment {...comment} />
                  {idx !== comments.length - 1 && (
                    <>
                      <div className="h-[1px] bg-[#E9E9E9] w-full my-5" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </BlogInnerLayout>
  );
};

export default PreviewBlog;
