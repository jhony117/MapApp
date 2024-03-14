const {  writeFileSync, mkdirSync } = require('fs');

//node

require('dotenv').config();

const targetPath = './src/environments/environment.ts'

const envFileContent = `
export const enviroment = {
  mapbox_key : "${process.env['MAPBOX_KEY']}",
  otra: "PROPIEDAD"
};
`;

mkdirSync('./src/environments', {recursive : true});

writeFileSync(targetPath , envFileContent);


//crear el env automaticamente,  uso de dotenv


//
