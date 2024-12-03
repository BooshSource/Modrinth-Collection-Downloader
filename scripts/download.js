const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const ModsConfig = require('../ModsConfig.json');
const { getFollowedProjectsModrinth, getCollectionProjects } = require('./getProjectsList');

/**
 * As Modrinth have introduced public collections   
 * There is no need to manually update configs file
 * Public collection can now be used for the list 
 * 
 * Requires config to define other options like version, loader, collection id
 * 
 * If no collection id then it downloads from follows list 
 * Follows list needs api key as its private collection
 */
const downloadModrinth = async () => {

  const { gameVersion, loader, modrinthCollectionId } = ModsConfig;
  const projectList = modrinthCollectionId !== '' ? await getCollectionProjects() : await getFollowedProjectsModrinth();

  projectList?.map(project => {
    axios.get(`https://api.modrinth.com/v2/project/${project.Project_ID}/version?game_versions=["${gameVersion}"]&loaders=["${loader}"]`)
      .then(res => {

        const fileName = res.data[0].files[0].filename;
        const fileURL = res.data[0].files[0].url;

        axios({ method: 'get', url: fileURL, responseType: 'stream' })
          .then(response => {
            // Downloaded jars will be saved in mods folder
            const writer = fs.createWriteStream(`mods/${fileName}`);
            response.data.pipe(writer);

            writer.on('finish', () => {
              console.log(`${fileName} download and save completed.`);
            });

            writer.on('error', err => {
              console.error('Error writing file:', err);
            });
          })
          .catch(error => {
            console.error('Error downloading file:', error);
          });
      })
      .catch(err => console.log(`${project.Mod_Name} -> Not Available (or Unknown error)`));
  });
};


if (!fs.existsSync('mods')) {
  fs.mkdirSync('mods', { recursive: true });
}

downloadModrinth();
