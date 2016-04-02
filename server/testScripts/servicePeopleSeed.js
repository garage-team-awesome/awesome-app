
var serviceProviders = [
  {
    "firstName": "Laura",
    "lastName": "Winslow",
    "isServiceProvider": true,
    "serviceProvided": "Case Worker",
    "email": "lw@caseworker.com",
    "telephone": "456-123-7890",
    "description": "Hi! I'm Laura Winslow, and I am your case worker. I am here to help you.",
    "additionalInfo": "Knows Arabic",
    "active": true
  },
  {
    "firstName": "Stanley",
    "lastName": "Lawrence",
    "isServiceProvider": true,
    "serviceProvided": "Docter",
    "email": "sl@doctor.com",
    "telephone": "789-123-4560",
    "description": "I am Dr. Stanley Lawrene. I am here for assisting you with medical issues.",
    "additionalInfo": "Specializes in pediatrics.",
    "active": true
  },
  {
    "firstName": "Henrietta",
    "lastName": "Wallace",
    "isServiceProvider": true,
    "serviceProvided": "Language Teacher",
    "email": "hw@language.com",
    "telephone": "4124-356-7890",
    "description": "I am Henrietta Wallace. I can assist you with learning English.",
    "additionalInfo": "",
    "active": true
  },
  {
    "firstName": "Diana",
    "lastName": "Smith",
    "isServiceProvider": true,
    "serviceProvided": "Translator",
    "email": "ds@translator.com",
    "telephone": "789-456-1230",
    "description": "I am Diana Smith. I can assist with translating Arabic.",
    "additionalInfo": "Fluent in Arabic",
    "active": true
  }
];

for (var i=0; i < serviceProviders.length; i++) {
  db.peoples.insert(serviceProviders[i]);
}

