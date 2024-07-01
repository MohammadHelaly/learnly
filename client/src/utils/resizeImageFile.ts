import Resizer from "react-image-file-resizer";

const resizeImageFile = (file: File) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			300,
			300,
			"JPEG",
			100,
			0,
			(uri) => {
				resolve(uri);
			},
			"base64"
		);
	});

export default resizeImageFile;
