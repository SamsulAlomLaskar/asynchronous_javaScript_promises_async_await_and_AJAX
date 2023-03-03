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

const wait = function (secs) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, secs * 1000);
  });
};

const loadNPause = async function () {
  try {
    let img = await creatImage("img/img-1.jpg");
    console.log("image 1 loaded");

    await wait(2);

    img.style.display = "none";

    img = await creatImage("img/img-2.jpg");
    console.log("image 2 loaded");

    await wait(2);

    img.style.display = "none";

    img = await creatImage("img/img-3.jpg");
    console.log("image 3 loaded");

    await wait(2);

    img.style.display = "none";
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

const imgArr = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];

const loadAll = async function (imgArry) {
  try {
    const imgs = imgArry.map(async (img) => await creatImage(img));
    console.log(imgs);

    const imgEl = await Promise.all(imgs);
    console.log("iIII", imgEl);

    imgEl.forEach((img) => {
      img.classList.add("parallel");
    });
  } catch (error) {
    console.error(error);
  }
};

loadAll(imgArr);
