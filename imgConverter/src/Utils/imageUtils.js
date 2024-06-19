import JSZip from "jszip";
import { saveAs } from "file-saver";

export const convertImage = (file, format) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          resolve(
            new File([blob], `${file.name.split(".")[0]}.${format}`, {
              type: `image/${format}`,
            })
          );
        }, `image/${format}`);
      };
    };
    reader.readAsDataURL(file);
  });
};

export const downloadFiles = (files) => {
  if (files.length > 1) {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "converted_images.zip");
    });
  } else if (files.length === 1) {
    saveAs(files[0]);
  }
};
