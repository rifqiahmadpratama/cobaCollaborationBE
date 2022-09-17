const fs = require('fs');
const { google } = require('googleapis')


const authenticateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: `${__dirname}/service-account.json`,
        scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
};

const uploadToGoogleDrive = async (file, auth) => {
    const fileMetadata = {
        // name: file.originalname,
        name: new Date().getTime() + '-' + (file.originalname.replace(/ /g, '-')),
        parents: ["1VpuBbCm_Gjmzok9jE1PNlRPIFPnpLQzO"], // Change it according to your desired parent folder id
    };

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
    };

    const driveService = google.drive({ version: "v3", auth });

    const response = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
    });
    return response;
};

const deleteFile = (filePath) => {
    fs.unlink(filePath, () => {
        console.log("file deleted");
    });
};

module.exports = {
    authenticateGoogle,
    uploadToGoogleDrive,
    deleteFile
}