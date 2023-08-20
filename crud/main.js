const { BrowserWindow, Notification } = require('electron')

let products = [];

const createProduct = (data) => {
  products.push({ id: Date.now(), ...data });
  return data;
}

const getProducts = () => {
  return products;
}


const deleteProduct = (id) => {
  products = products.filter(pro => pro.id != id);
  return true;
}


const getProductById = (id) => {
  return products.find(pro => pro.id == id);
}


const updateProductById = (id, data) => {
  products = products.map(pro => pro.id == id ? data : pro);
  return true;
}


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('src/ui/index.html')
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProductById
};