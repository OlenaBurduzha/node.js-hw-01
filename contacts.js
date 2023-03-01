const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

//  * Розкоментуйте і запиши значення
const contactsPath = path.join("db", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  // console.log(contacts);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id.toString() === id.toString());
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (item) => item.id.toString() === id.toString()
  );
  if (idx === -1) {
    return null;
  }

  const newContact = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContact);
  return contacts[idx];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
