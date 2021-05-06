import Tag from '../Tag';
import SocialIcons from '../SocialIcons';

const GeneralDetails = ({
  categories,
  tags,
  description,
  streetLine1,
  streetLine2,
  neighbor,
  country,
  postcode
}) => {
  return (
    <div className="relative md:min-w-80vw  px-3 md:px-12 flex items-center justify-center">
      <div className="min-h-50vh max-h-full py-5 md:max-h-136 flex flex-row items-start gap-5 md:gap-10">
        {/* TAGS */}
        <div className="flex flex-col md:flex-row self-stretch overflow-y-auto overflow-x-hidden">
          <div className="px-1 flex flex-row md:flex-col mb-3">
            <div className="flex-1">
              <h3 className="uppercase mb-3 font-medium">categories</h3>
              <div className="flex flex-wrap max-w-40 mb-3 gap-2">
                {categories?.map((cat, i) => (
                  <Tag key={`${cat.id}-${i}`} name={cat.name} theme={cat.theme} cat={cat} small />
                ))}
              </div>
            </div>
            <div className="w-0.5 md:w-10 md:border  md:border-b-1 md:mb-3" />
            <div className="flex-1">
              <h3 className="uppercase mb-3 font-medium">tags</h3>
              <div className="flex flex-wrap max-w-40 gap-2">
                {tags?.map((cat, i) => (
                  <Tag key={`${cat.id}-${i}`} filterTag name={cat.name} />
                ))}
              </div>
            </div>
          </div>

          <p className="px-1 w-85vw md:w-136 font-serif">{description}</p>
        </div>
        <div className=" flex flex-col justify-between self-stretch">
          <div>
            <h3 className="uppercase mb-3 font-medium">Address</h3>
            <p className="font-serif">{streetLine1}</p>
            <p className="font-serif">{streetLine2}</p>
            <p className="font-serif">{neighbor}</p>
            <p className="font-serif">{country}</p>
            <p className="font-serif">{postcode}</p>
          </div>
          <div>
            <div className="w-10 md:border md:border-b-1  md:mb-3" />
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetails;
