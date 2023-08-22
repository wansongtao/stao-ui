import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('user', () => {
  const token = ref('');
  function getToken() {
    return token.value || localStorage.getItem('token');
  }
  function setToken(value: string) {
    token.value = value;
    localStorage.setItem('token', value);
  }
  function removeToken() {
    token.value = '';
    localStorage.removeItem('token');
  }

  return {
    token,
    getToken,
    setToken,
    removeToken
  };
});

export default useUserStore;
