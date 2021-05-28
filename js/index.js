import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      // 一律使用 function return
      // 加入站點
      url: 'https:///vue3-course-api.hexschool.io',
      // 加入個人 API Path
      path: 'kevinapog47138',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  mounted() {
    // 建立新產品、編輯產品
    productModal = new bootstrap.Modal(
      document.getElementById('productModal'),
      {
        // keyboard:false時，按下esc時不關閉當前畫面
        keyboard: false,
      }
    );

    // 刪除產品
    delProductModal = new bootstrap.Modal(
      document.getElementById('delProductModal'),
      {
        // keyboard:false時，按下esc時不關閉當前畫面
        keyboard: false,
      }
    );

    // // 取出 Token
    // const token = document.cookie.replace(
    //   /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    //   '$1'
    // );
    // if (token === '') {
    //   // promise 先跳出提示視窗，按確定後才跳轉回登入頁
    //   swal('出錯了!', '您尚未登入請重新登入。', 'error')
    //     .then(() => {
    //       window.location = 'login.html';
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    // axios.defaults.headers.common['Authorization'] = token;
    // this.getData();
  },
  methods: {
    // 函式的集合

    // 取得訂單列表
    getData(page = 1) {
      const url = `${this.url}/api/${this.path}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 編輯訂單內容
    updateProduct() {
      let url = `${this.url}/api/${this.path}/admin/product`;
      let http = 'post';
      if (!this.isNew) {
        url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }
      axios[http](url, { data: this.tempProduct })
        .then((response) => {
          if (response.data.success) {
            swal('成功!', '產品新增、編輯成功', 'success');
            productModal.hide();
            this.getData();
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 開啟建立新產品、編輯、刪除方法
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },

    // 刪除產品方法
    delProduct() {
      const url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((response) => {
          if (response.data.success) {
            swal('成功!', '產品刪除成功', 'success');
            delProductModal.hide();
            this.getData();
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  created() {
    // 元件生成，必定會執行的項目
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (token === '') {
      // promise 先跳出提示視窗，按確定後才跳轉回登入頁
      swal('出錯了!', '您尚未登入請重新登入。', 'error')
        .then(() => {
          window.location = 'login.html';
        })
        .catch((error) => {
          console.log(error);
        });
    }
    axios.defaults.headers.common['Authorization'] = token;
    this.getData();
  },
}).mount('#app');
