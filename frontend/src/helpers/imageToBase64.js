const imageToBase64 = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);  // This resolves the promise with the base64 image data
        reader.onerror = (error) => reject(error);
    });

    return data;
};

export default imageToBase64;
