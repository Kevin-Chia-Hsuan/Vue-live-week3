import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      // 一律使用 function return
      // 加入站點
      url: 'https:///vue3-course-api.hexschool.io',
      // 加入個人 API Path
      path: 'kevinapog47138',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 函式的集合
    login() {
      const api = `${this.url}/admin/signin`;
      axios
        .post(api, this.user)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            // const token = res.data.token;
            // const expired = res.data.expired;

            // 使用解構手法，因為res.data裡有token及expired
            const { token, expired } = res.data;
            console.log(token, expired);
            // 增加cookie
            document.cookie = `hexToken=${token};expired=${new Date(
              expired
            )}; path=/`;
            window.location = 'index.html';
          } else {
            swal('出錯了!', '登入失敗，請檢查帳號、密碼', 'error');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // 元件生成，必定會執行的項目
  },
}).mount('#app');
