export default class FileConstants {
    public static JPG = 'image/jpg';

    public static JPEG = 'image/jpeg';

    public static PNG = 'image/png';

    public static IMAGE_ROUTE = 'IMAGES';

    public static getContentTypes() {
        return [FileConstants.JPG, FileConstants.JPEG, FileConstants.PNG];
    }

    public static getImageExtensions() {
        return ['jpg', 'jpeg', 'png'];
    }
}
