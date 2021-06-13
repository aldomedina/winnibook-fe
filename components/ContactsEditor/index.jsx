import { useState, useEffect } from 'react';

import CustomSelect from '../CustomSelect';
import { Icon } from '../Icon';
import Input from '../Input';
import Tag from '../Tag';

const dropdownOptions = [
  {
    name: "Public",
    value: true
  },
  {
    name: "Private",
    value: false
  }
];

const ContactsEditor = ({initialContacts, onContactsChange}) => {

  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactType, setNewContactType] = useState('');
  const [newContactValue, setNewContactValue] = useState('');
  const [newContactIsPublic, setNewContactIsPublic] = useState(false);

  useEffect(() => {
    if (initialContacts) {
      setContacts(initialContacts);
    }
  }, []);

  const setLinkValue = (key, value, index) => {
    let tempContacts = contacts;
    tempContacts[index][key] = value;
    setContacts(tempContacts);
    console.log(tempContacts, key, value, index);
    onContactsChange(tempContacts);
  }

  const addLink = () => {
    let tempContacts = contacts;
    tempContacts.push({
      name: newContactName,
      type: newContactType,
      value: newContactValue,
      is_public: newContactIsPublic
    })

    setContacts(tempContacts);
    onContactsChange(tempContacts);

    setNewContactName("");
    setNewContactType("");
    setNewContactValue("");
    setNewContactIsPublic(false);
  }

  return (
    <div>
      {
        contacts.map((item, index) => (
          <div className="mb-4 py-2 border-b flex items-center">
            <div className="mr-4 flex-grow">
              <Input
                customClasses="min-h-40p"
                value={item.name}
                placeholder="Name"
                disabled
              />
            </div>
            <div className="w-1/4 flex-grow mr-4">
              <Input
                customClasses="min-h-40p"
                value={item.type}
                placeholder="Type (e.g. Phone, Email, Sales number)"
                disabled
              />
            </div>
            <div className="w-1/4 flex-grow mr-4">
              <Input
                customClasses="min-h-40p"
                value={item.value}
                placeholder="Value (e.g. john@gmail.com, +1 800 000 000)"
                disabled
              />
            </div>
            <div className="flex-grow">
              <CustomSelect
                options={dropdownOptions}
                placeholder="Public contact"
                value={item.is_public}
                disabled
              />
            </div>
            <div
              onClick={() => setContacts(contacts.filter((link, linkIndex) => linkIndex !== index))}
            >
              <Icon icon="x" />
            </div>
          </div>
        ))
      }
      <div className="mb-4 py-2 border-b flex items-center">
        <div className="mr-4 flex-grow">
          <Input
            customClasses="min-h-40p"
            value={newContactName}
            placeholder="Name (e.g. Sales number, Main email)"
            onChange={(value) => setNewContactName(value)}
          />
        </div>
        <div className="flex-grow mr-4">
          <Input
            customClasses="min-h-40p"
            value={newContactType}
            placeholder="Type (e.g. Phone, Email, Fax)"
            onChange={(value) => setNewContactType(value)}
          />
        </div>
        <div className="flex-grow mr-4">
          <Input
            customClasses="min-h-40p"
            value={newContactValue}
            placeholder="Value (e.g. john@gmail.com, +1 800 000 000)"
            onChange={(value) => setNewContactValue(value)}
          />
        </div>
        <div className="flex-grow mr-4">
          <CustomSelect
            options={dropdownOptions}
            placeholder="Public contact"
            value={newContactIsPublic}
            onChange={(value) => setNewContactIsPublic(value)}
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

export default ContactsEditor;
