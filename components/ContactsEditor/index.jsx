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

const contactTypesOptions = [
  {
    name: "Phone",
    value: "PHONE"
  },
  {
    name: "Email",
    value: "EMAIL"
  },
  {
    name: "Fax",
    value: "FAX"
  },
  {
    name: "Messages",
    value: "MESSENGER"
  }
]

const ContactsEditor = ({initialContacts, onContactsChange, noPrivate}) => {

  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactType, setNewContactType] = useState(contactTypesOptions[0].value);
  const [newContactValue, setNewContactValue] = useState('');
  const [newContactIsPublic, setNewContactIsPublic] = useState(false);
  
  useEffect(() => {
    if (initialContacts) {
      setContacts(initialContacts);
    }
  }, [initialContacts]);

  const setLinkValue = (key, value, index) => {
    let tempContacts = contacts;
    tempContacts[index][key] = value;
    setContacts(tempContacts);
    onContactsChange(tempContacts);
  }

  const addContact = () => {
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

  const removeContact = (index) => {
    let tempContacts = contacts.filter((contact, contactIndex) => contactIndex !== index);
    setContacts(tempContacts);
    onContactsChange(tempContacts);
  }

  return (
    <div>
      {
        contacts.map((item, index) => (
          <div className="mb-4 py-2 border-b flex flex-wrap items-center">
            <div className="mb-4 w-full">
              <Input
                customClasses="min-h-40p"
                value={item.name}
                placeholder="Name"
                disabled
              />
            </div>
            <div className="w-1/4 flex-grow w-full md:w-auto mb-4 md:mb-0 md:mr-4">
              <Input
                customClasses="min-h-40p"
                value={item.type}
                placeholder="Type (e.g. Phone, Email, Sales number)"
                disabled
              />
            </div>
            <div className="w-1/4 flex-grow w-full md:w-auto mb-4 md:mb-0 md:mr-4">
              <Input
                customClasses="min-h-40p"
                value={item.value}
                placeholder="Value (e.g. john@gmail.com, +1 800 000 000)"
                disabled
              />
            </div>
            {
              !noPrivate &&
              <div className="flex-grow">
                <CustomSelect
                  options={dropdownOptions}
                  placeholder="Public contact"
                  value={item.is_public}
                  disabled
                />
              </div>
            }
            <div
              onClick={() => removeContact(index)}
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
            value={newContactName}
            placeholder="Name (e.g. Sales number, Main email)"
            onChange={(value) => setNewContactName(value)}
          />
        </div>
        <div className="flex-grow w-full md:w-auto mb-4 md:mb-0 md:mr-4">
          <CustomSelect
            options={contactTypesOptions}
            placeholder="Type"
            value={newContactType}
            onChange={(value) => setNewContactType(value)}
          />
        </div>
        <div className="flex-grow w-full md:w-auto mb-4 md:mb-0 md:mr-4">
          <Input
            customClasses="min-h-40p"
            value={newContactValue}
            placeholder="Value (e.g. john@gmail.com, +1 800 000 000)"
            onChange={(value) => setNewContactValue(value)}
          />
        </div>
        {
          !noPrivate &&
          <div className="flex-grow">
            <CustomSelect
              options={dropdownOptions}
              placeholder="Public contact"
              value={newContactIsPublic}
              onChange={(value) => setNewContactIsPublic(value)}
            />
          </div>
        }
        <div
          onClick={addContact}
        >
          <Tag name="ADD" filterTag big />
        </div>
      </div>
    </div>
  );
};

export default ContactsEditor;
