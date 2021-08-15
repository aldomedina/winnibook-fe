import { useState, useEffect } from 'react';
import { Icon } from '../Icon';

import Input from '../Input';
import Tag from '../Tag';

const LinksEditor = ({initialLinks, onLinksChange}) => {

  const [links, setLinks] = useState([]);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialLinks) {
      setLinks(initialLinks);
      console.log(initialLinks);
    }
  }, [initialLinks]);

  const setLinkValue = (key, value, index) => {
    let tempLinks = links;
    tempLinks[index][key] = value;
    setLinks(tempLinks);
    onLinksChange(tempLinks);
  }

  const addLink = () => {

    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (!urlRegex.test(newLinkUrl)) {
      setError(true)
      return;
    };

    setError(false);

    let tempLinks = links;
    tempLinks.push({
      name: newLinkName,
      url: newLinkUrl
    })

    setLinks(tempLinks);
    onLinksChange(tempLinks);

    console.log(tempLinks);

    setNewLinkName("");
    setNewLinkUrl("");
  }

  const removeLink = (index) => {
    let tempLinks = links.filter((link, linkIndex) => linkIndex !== index);
    setLinks(tempLinks);
    onLinksChange(tempLinks);
  }

  return (
    <div>
      {
        links.map((item, index) => (
          <div className="mb-4 py-2 border-b flex flex-wrap items-center">
            <div className="mb-4 w-full">
              <Input
                customClasses="min-h-40p"
                value={item.name}
                placeholder="Name (e.g. Instagram, Facebook, Twitter)"
                disabled
              />
            </div>
            <div className="w-full md:w-auto md:mr-4 mb-4 flex-grow">
              <Input
                customClasses="min-h-40p"
                value={item.url}
                placeholder="http://example.com"
                disabled
              />
            </div>
            <div
              onClick={() => removeLink(index)}
            >
              <Icon icon="x" />
            </div>
          </div>
        ))
      }
      <div className="mb-4 py-2 flex flex-wrap items-center">
        <div className="mb-4 w-full">
          <Input
            customClasses="min-h-40p"
            value={newLinkName}
            placeholder="Name (e.g. Instagram, Facebook, Twitter)"
            onChange={(value) => setNewLinkName(value)}
          />
        </div>
        <div className="w-full md:w-auto md:mr-4 mb-4 flex-grow">
          <Input
            customClasses="min-h-40p"
            value={newLinkUrl}
            placeholder="http://example.com"
            onChange={(value) => setNewLinkUrl(value)}
            error={error}
          />
          {
            error &&
            <span className="text-red-500">Invalid link</span>
          }
        </div>
        <div
          onClick={addLink}
        >
          <Tag name="ADD" filterTag big />
        </div>
      </div>
    </div>
  );
};

export default LinksEditor;
