# **Modrinth Collection Downloader**

Easily download your Private <b>Modrinth</b> Collections.<br/>

## **Reason this fork exists**
The original repo by Yasin had WAY too much information dumped on the README and the latest version did not work for me and i really did not feel like looking into what the problem was (BTW this is based on the version prior to his last update). I removed most of what i thought was unnecesary from here like the private key, CurseForge API, and left only what was needed for the config. 

Very good program though i just wanted to make this simpler for future me 🙇‍♂️
##



### Arguments

- ####   Downloads the mods:
  `npm run download`

  ```
  - if Collection is Public
  - else if Collection is Private
  ```


## Usage

  - Make sure your collection is <b>PUBLIC</b>.
  - <b>ModsConfig.json</b> is the configuration file.
    ```json
      {
        "gameVersion": "1.20.1",
        "loader": "fabric",
        "modrinthUserId": "<User ID>", 
        // Modrinth -> Profile -> 3 dots -> Copy ID
        "modrinthCollectionId": "<Collection ID>"
        // On the Collections page everything after "https://modrinth.com/collection/" in the URL is the ID
      }
    ```

- Run the tool with the configuration file as an argument:

   ```
   npm run download
   ```


## License

This project is under the <b>MIT</b> license.

## Acknowledgments

- This project utilizes the Modrinth API to retrieve mod information and download links.
