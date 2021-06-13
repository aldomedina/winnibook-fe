import { useState, useEffect } from 'react';
import { Icon } from '../Icon';

import Input from '../Input';
import Tag from '../Tag';

const LinksEditor = ({initialLinks, onLinksChange}) => {

  const [links, setLinks] = useState([]);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  useEffect(() => {
    if (initialLinks) {
      setLinks(initialLinks);
    }
  }, []);

  const setLinkValue = (key, value, index) => {
    let tempLinks = links;
    tempLinks[index][key] = value;
    setLinks(tempLinks);
    console.log(tempLinks, key, value, index);
    onLinksChange(tempLinks);
  }

  const addLink = () => {
    let tempLinks = links;
    tempLinks.push({
      name: newLinkName,
      url: newLinkUrl
    })

    setLinks(tempLinks);

    setNewLinkName("");
    setNewLinkUrl("");
  }

  return (
    <div>
      {
        links.map((item, index) => (
          <div className="mb-4 py-2 border-b flex items-center">
            <div className="mr-4">
              <Input
                customClasses="min-h-40p"
                value={item.name}
                placeholder="Name (e.g. Instagram, Facebook, Twitter)"
                disabled
              />
            </div>
            <div className="w-2/3 mr-4">
              <Input
                customClasses="min-h-40p"
                value={item.url}
                placeholder="http://example.com"
                disabled
              />
            </div>
            <div
              onClick={() => setLinks(links.filter((link, linkIndex) => linkIndex !== index))}
            >
              <Icon icon="x" />
            </div>
          </div>
        ))
      }
      <div className="mb-4 py-2 border-b flex items-center">
        <div className="mr-4">
          <Input
            customClasses="min-h-40p"
            value={newLinkName}
            placeholder="Name (e.g. Instagram, Facebook, Twitter)"
            onChange={(value) => setNewLinkName(value)}
          />
        </div>
        <div className="w-2/3 mr-4">
          <Input
            customClasses="min-h-40p"
            value={newLinkUrl}
            placeholder="http://example.com"
            onChange={(value) => setNewLinkUrl(value)}
          />
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
