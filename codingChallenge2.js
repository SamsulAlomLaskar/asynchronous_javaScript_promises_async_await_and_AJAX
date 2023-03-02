const imgContainer = document.querySelector(".images");
const creatImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currImg;
creatImage("img/img-1.jpg")
  .then((img) => {
    currImg = img;
    console.log("image loaded");
    return wait(2);
  })
  .then(() => {
    currImg.style.display = "none";
    return creatImage("img/img-2.jpg");
  })
  .then((img) => {
    currImg = img;
    console.log("image loaded");
    return wait(2);
  })
  .then(() => {
    currImg.style.display = "none";
    return creatImage("img/img-3.jpg");
  })
  .then((img) => {
    currImg = img;
    console.log("image loaded");
    return wait(2);
  })
  .then(() => {
    currImg.style.display = "none";
  })
  .catch((err) => {
    console.log(err);
  });
