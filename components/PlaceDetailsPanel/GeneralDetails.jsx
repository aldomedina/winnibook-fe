import Tag from '../Tag';
import SocialIcons from '../SocialIcons';

const GeneralDetails = ({ categories, tags, description, address, links, contacts }) => {
  return (
    <div
      className="
        relative 
        md:min-w-30vw

        py-32
        px-12 
        md:px-32 

        flex 
        justify-center
      "
    >
      <div className="flex-grow min-h-50vh max-h-full md:max-h-136 w-full flex flex-row items-start gap-5 md:gap-10">
        <div className="flex flex-grow flex-col">
          <div className="px-1 flex flex-col mb-3">
            {/* CATEGORIES */}
            <div className="flex-1">
              <h3 className="uppercase mb-3 font-medium">categories</h3>
              <div className="flex flex-wrap max-w-45 mb-3 gap-2">
                {categories?.map((cat, i) => (
                  <Tag
                    key={`${cat.category.id}-${i}`}
                    name={cat.category.name}
                    theme={cat.category.theme}
                    tagInfo={cat.category}
                    small
                  />
                ))}
              </div>
            </div>

            {tags && tags.length > 0 && (
              <>
                {/* TAGS */}
                <div className="w-0.5 md:w-10 md:border  md:border-b-1 md:mb-3" />
                <div className="flex-1">
                  <h3 className="uppercase mb-3 font-medium">tags</h3>
                  <div className="flex flex-wrap max-w-40 gap-2">
                    {tags?.map((item, i) => (
                      <Tag key={`${item.tag.id}-${i}`} filterTag name={item.tag.name} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {description && description !== '' && (
          <div className="md:min-w-40vw flex flex-grow flex-col justify-between self-stretch">
            <p className="w-85vw md:w-full font-serif">{description}</p>
          </div>
        )}

        <div className="flex flex-col justify-between self-stretch md:min-w-32">
          <div>
            <h3 className="uppercase mb-3 font-medium">Address</h3>
            <p className="font-serif">{address.street_line_1}</p>
            <p className="font-serif">{address.street_line_2}</p>
            <p className="font-serif">{address.neighbour}</p>
            <p className="font-serif">{address.postcode}</p>
            <p className="font-serif">{address.city?.name}</p>
          </div>

          <div>
            <div className="w-10   md:mb-3" />

            <ul className="">
              {links?.map(item => (
                <li className="mb-2">
                  <a href={item.link.url} target="_blank">
                    {item.link.name}
                  </a>
                </li>
              ))}
            </ul>

            {links && links.length > 0 && <div className="w-10 md:border md:border-b-1  md:mb-3" />}

            <ul className="">
              {contacts?.map(item => (
                <li className="mb-2">
                  {item.contact.name}
                  <br />
                  {item.contact.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetails;
