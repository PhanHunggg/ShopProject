var productService = new ProductService();

function domId(id) {
  return document.getElementById(id);
}

function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);
  });
}

window.onload = function () {
  getProductList();
};

function renderProductList(data) {
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
    <tr>
    <td>${i + 1}</td>
    <td>${data[i].name}</td>
    <td>${data[i].price}</td>
    <td>${data[i].image}</td>
    <td>
    <button onclick="openUpdateModal(${data[i].id})" data-toggle="modal"
    data-target="#myModal" class="btn btn-primary">Sửa</button>
    <button onclick="deleteProduct(${
      data[i].id
    })" class="btn btn-danger ml-3">Xóa</button>
    </td>
  </tr>
    `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
}

domId("btnThemSP").onclick = function () {
  domId("myForm").reset();
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML =
    "<button onclick='addProduct()' class='btn btn-primary'>Thêm</button>";
};

domId("closeModal").onclick = () => {
  document.getElementById("spanName").innerHTML = "";
  document.getElementById("spanPrice").innerHTML = "";
  document.getElementById("spanScreen").innerHTML = "";
  document.getElementById("spanBlackCa").innerHTML = "";
  document.getElementById("spanFrontCa").innerHTML = "";
  document.getElementById("spanImage").innerHTML = "";
  document.getElementById("spanDesc").innerHTML = "";
  document.getElementById("spanType").innerHTML = "";
}

const validateForm = () => {
  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let screen = domId("screen").value;
  let blackCamera = domId("BlackCamera").value;
  let fontCamera = domId("fontCamera").value;
  let image = domId("HinhSP").value;
  let desc = domId("description").value;
  let type = domId("loaiSP").value;

  let isValid = true;

  isValid &= required(name, "spanName");
  isValid &= required(price, "spanPrice") && checkPrice(price, "spanPrice");
  isValid &=
    required(screen, "spanScreen") && checkScreen(screen, "spanScreen");
  isValid &= required(blackCamera, "spanBlackCa") && checkBalckCa(blackCamera, "spanBlackCa");
  isValid &= required(fontCamera, "spanFrontCa") && checkFontCa(fontCamera, "spanFrontCa");
  isValid &= required(image, "spanImage") && checkImg(image, "spanImage");
  isValid &= required(desc, "spanDesc");
  isValid &= requiredOption(type, "spanType");

  return isValid;
};

function addProduct() {
  let isValid = validateForm();
  if (!isValid) return;

  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let screen = domId("screen").value;
  let blackCamera = domId("BlackCamera").value;
  let fontCamera = domId("fontCamera").value;
  let image = domId("HinhSP").value;
  let desc = domId("description").value;
  let type = domId("loaiSP").value;

  let product = new Product(
    name,
    price,
    screen,
    blackCamera,
    fontCamera,
    image,
    desc,
    type
  );

  productService.addProduct(product).then(function () {
    alert("Thêm sản phẩm thành công.");
    getProductList();
  });
}

function openUpdateModal(id) {
  document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick='updateProduct(${id})' class='btn btn-primary'>Sửa</button>`;

  productService.getById(id).then(function (reponse) {
    domId("TenSP").value = reponse.data.name;
    domId("GiaSP").value = reponse.data.price;
    domId("HinhSP").value = reponse.data.image;
    domId("loaiSP").value = reponse.data.type;
    domId("screen").value = reponse.data.screen;
    domId("BlackCamera").value = reponse.data.blackCamera;
    domId("fontCamera").value = reponse.data.fontCamera;
    domId("description").value = reponse.data.desc;
  });
}

function updateProduct(id) {
  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let screen = domId("screen").value;
  let blackCamera = domId("BlackCamera").value;
  let fontCamera = domId("fontCamera").value;
  let image = domId("HinhSP").value;
  let desc = domId("description").value;
  let type = domId("loaiSP").value;

  var product = new Product(
    name,
    price,
    screen,
    blackCamera,
    fontCamera,
    image,
    desc,
    type
  );

  productService.updateProduct(id, product).then(function (reponse) {
    getProductList();
    alert("Sửa sản phẩm thành công");
    document.querySelector(".close").click();
  });
}

function deleteProduct(id) {
  productService.deleteProduct(id).then(function () {
    getProductList();
  });
}

// ============ Validate function =========================
const required = (value, span) => {
  if (value.length === 0) {
    document.getElementById(span).innerHTML = "*Thông tin bắt buộc nhập";
    return false;
  }
  document.getElementById(span).innerHTML = "";
  return true;
};

const requiredOption = (value, span) => {
  if (value.length === 0) {
    document.getElementById(span).innerHTML = "*Vui lòng chọn loại";
    return false;
  }
  document.getElementById(span).innerHTML = "";
  return true;
};

const checkPrice = (value, span) => {
  const pattern = /^[0-9]{4,10}$/g;
  if (pattern.test(value)) {
    document.getElementById(span).innerHTML = "";
    return true;
  }
  document.getElementById(span).innerHTML =
    "*Vui lòng nhập Price từ 4-10 chữ số";
  return false;
};

const checkScreen = (value, span) => {
  const pattern = /^\d*\.?\d*$/g;
  if (pattern.test(value)) {
    document.getElementById(span).innerHTML = "";
    return true;
  }
  document.getElementById(span).innerHTML = "*Vui lòng nhập Screen là chữ số";
  return false;
};

const checkImg = (value, span) => {
  const pattern = /([^\\s]+((.*?)(jpg|png|gif|bmp))$)/g;
  if (pattern.test(value)) {
    document.getElementById(span).innerHTML = "";
    return true;
  }
  document.getElementById(span).innerHTML =
    "*Vui lòng nhập image có đuôi .jpg, .png, .gif, .bmp";
  return false;
};

const checkBalckCa = (value, span) => {
  const pattern = /^[0-9]{1,3}$/g;
  if (pattern.test(value)) {
    document.getElementById(span).innerHTML = "";
    return true;
  }
  document.getElementById(span).innerHTML =
    "*Vui lòng nhập BackCamera từ 1-3 chữ số";
  return false;
};

const checkFontCa = (value, span) => {
  const pattern = /^[0-9]{1,3}$/g;
  if (pattern.test(value)) {
    document.getElementById(span).innerHTML = "";
    return true;
  }
  document.getElementById(span).innerHTML =
    "*Vui lòng nhập FontCamera từ 1-3 chữ số";
  return false;
};