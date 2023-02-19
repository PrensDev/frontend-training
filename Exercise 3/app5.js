let nestedObject = {
  speakers: [{name:"Elie"},{name:"Tim"},{name:"Matt"}],
  data: {
    continents: {
      europe: {
        countries: {
          switzerland: {
            capital: "Bern",
            population: 8000000
          }
        }
      }
    },
    languages: {
      spanish: {
          hello: "Hola"
      },
      french: {
          hello: "Bonjour"
      }
    }
  }
}



function addSpeaker (obj) {
  if (!'name' in obj) {
    console.error('Object must have a name property');
    return;
  }

  nestedObject.speakers.push(obj);
}

addSpeaker({ name: 'Jetsun' });

console.log(JSON.stringify(nestedObject.speakers, null, 2));



function addLanguage(key, obj) {
  if (!'hello' in obj) {
    console.error("Object must have a 'hello' property");
    return;
  }
  nestedObject.data.languages[key] = obj;
}

// addLanguage('filipino', { hello: 'Kumusta' })

// console.log(JSON.stringify(nestedObject.data.languages, null, 2));



function addCountry(key, obj) {
  if(!'capital' in obj) {
    console.error("Object must have a 'capital' property");
    return;
  }
  if(!'population' in obj) {
    console.error("Object must have a 'population' property");
    return;
  }
  nestedObject.data.continents.europe.countries[key] = obj;
}

// addCountry('france', { capital: 'Paris', population: 10000 });

// console.log(JSON.stringify(nestedObject.data.continents.europe.countries, null, 2));