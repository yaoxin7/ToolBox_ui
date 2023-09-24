// TODO 将Blod转换成文本

const toText = function blobToString(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            resolve(text);
        };
        reader.onerror = reject;
        reader.readAsText(blob);
    });
}

export default toText;
