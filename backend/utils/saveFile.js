const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

// return a data img json
export function getImg(coverEncoded) {
  if (coverEncoded == null) return;

  var data = getDataForImage(coverEncoded);

  return data;
}

// save an image json
export function saveFileObj(doc, coverEncoded) {
  if (coverEncoded == null) return;
  var data = getDataForImage(coverEncoded);
  doc.img = data;
}

// save an Array of an image
export function saveSingleFile(doc, coverEncoded) {
  if (coverEncoded == null) return;
  var img = [];
  var data = getDataForImage(coverEncoded);
  img.push(data);
  doc.img = img;
}

// save an Array of images
export function saveMultipleFile(doc, coverEncoded) {
  if (coverEncoded == null) return;
  var i = 0;
  var img = [];
  var data = {};
  for (i = 0; i < coverEncoded.length; i++) {
    var data = getDataForImage(coverEncoded[i]);
    img.push(data);
  }
  doc.img = img;
}

// convert from encoded image to data img
export function getDataForImage(coverEncoded) {
  const cover = JSON.parse(coverEncoded);
  var data;
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    data = {
      coverImage: new Buffer.from(cover.data, "base64"),
      coverImageType: cover.type,
    };
  }
  return data;
}

export function setDataForImage() {

}